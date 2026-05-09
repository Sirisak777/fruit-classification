import pytest
from fastapi.testclient import TestClient
import os
import sys
import io
from PIL import Image

# 1. จัดการ Path ให้ชี้ไปที่ main.py อย่างถูกต้อง
# ใช้ Path แบบ Absolute เพื่อป้องกันปัญหาเวลารันจากโฟลเดอร์ที่ต่างกัน
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.join(BASE_DIR, 'deployment', 'api'))

from main import app

# 2. การเช็คไฟล์โมเดลที่ "ฉลาด" ขึ้น (เช็คทุกจุดที่โมเดลอาจจะไปอยู่)
POSSIBLE_PATHS = [
    "fruit_model_quantized.onnx",                          # ใน Docker/Root
    os.path.join(BASE_DIR, "deployment", "api", "fruit_model_quantized.onnx"), # Local Path
    os.path.join(BASE_DIR, "fruit_model_quantized.onnx")   # CI Path
]
MODEL_EXISTS = any(os.path.exists(p) for p in POSSIBLE_PATHS)

@pytest.fixture(scope="module")
def test_client():
    """Fixture สำหรับสร้าง TestClient ที่รองรับ lifespan (สำคัญมากสำหรับ Startup/Shutdown)"""
    # การใช้ 'with' จะสั่งให้ FastAPI รันโค้ดใน lifespan (เช่นโหลดโมเดล)
    try:
        with TestClient(app) as client:
            yield client
    except Exception as e:
        print(f"Startup failed (possibly missing model): {e}")
        # ถ้าพังที่ Startup ให้สร้าง client แบบปกติมาเพื่อเทสตัวที่ไม่ใช้โมเดล
        yield TestClient(app)

def test_read_root(test_client):
    """เช็คความพร้อมของ API (ไม่ต้องใช้โมเดล)"""
    response = test_client.get("/")
    assert response.status_code == 200
    # เช็คว่ามีข้อความตอบกลับที่ถูกต้อง
    assert "ready" in response.json()["message"].lower()

@pytest.mark.skipif(not MODEL_EXISTS, reason=f"Model file not found in {POSSIBLE_PATHS}")
def test_predict_incorrect_file_type(test_client):
    """เช็ค Error 400 เมื่อส่งไฟล์ที่ไม่ใช่รูปภาพ"""
    files = {'file': ('test.txt', b'this is plain text', 'text/plain')}
    response = test_client.post("/predict", files=files)
    assert response.status_code == 400

@pytest.mark.skipif(not MODEL_EXISTS, reason="Model file not found.")
def test_predict_structure(test_client):
    """เช็คโครงสร้าง JSON ผลลัพธ์ (หัวใจสำคัญของ MLOps Test)"""
    # สร้างรูปจำลองขนาด 224x224
    img = Image.new('RGB', (224, 224), color='red')
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='JPEG')
    img_byte_arr = img_byte_arr.getvalue()

    files = {'file': ('test.jpg', img_byte_arr, 'image/jpeg')}
    response = test_client.post("/predict", files=files)
    
    # ถ้ายังได้ 500 แสดงว่ามีปัญหาที่ตัวแปรใน main.py (เช่นชื่อ Class ไม่ตรง)
    assert response.status_code == 200
    
    data = response.json()
    # ตรวจสอบ Key ที่ API ของคุณส่งออกมาจริง
    assert "class" in data
    assert "confidence_percent" in data
    assert isinstance(data["confidence_score"], float)