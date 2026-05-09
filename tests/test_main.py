import pytest
from fastapi.testclient import TestClient
import os
import sys
import io
from PIL import Image

# นำทางไปหา main.py
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'deployment', 'api'))
from main import app

# --- ส่วนที่เพิ่มเข้ามาเพื่อความปลอดภัย ---
# เช็คว่ามีไฟล์โมเดลอยู่จริงไหม (ตรวจสอบทั้งสองที่ที่อาจจะเป็นไปได้)
MODEL_PATH = "deployment/api/fruit_model_quantized.onnx"
MODEL_EXISTS = os.path.exists(MODEL_PATH) or os.path.exists("models/fruit_model_quantized.onnx")
# ---------------------------------------

@pytest.fixture(scope="module")
def test_client():
    # ใช้ try-except เพื่อดักจับกรณีโหลดโมเดลไม่สำเร็จ (Service Unavailable)
    try:
        with TestClient(app) as client:
            yield client
    except Exception as e:
        # ถ้าโหลดโมเดลไม่ได้ (เพราะไม่มีไฟล์) ให้ yield client เปล่าๆ ออกไป 
        # เพื่อให้ Test ตัวแรก (Root) ยังทำงานได้
        yield TestClient(app)

def test_read_root(test_client):
    """เช็คว่า API Endpoint หลักทำงานได้ (ไม่ต้องใช้โมเดล)"""
    response = test_client.get("/")
    assert response.status_code == 200
    assert "ONNX" in response.json()["message"]

# ใช้ @pytest.mark.skipif เพื่อสั่งให้ "ข้าม" การทดสอบที่ต้องใช้โมเดล ถ้าหาไฟล์โมเดลไม่เจอ
@pytest.mark.skipif(not MODEL_EXISTS, reason="Model file not found. Skipping prediction tests.")
def test_predict_incorrect_file_type(test_client):
    """เช็ค Error Handling: กรณีส่งไฟล์ไม่ใช่รูปภาพ"""
    files = {'file': ('test.txt', b'not an image', 'text/plain')}
    response = test_client.post("/predict", files=files)
    # ถ้าไม่มีโมเดล API อาจตอบ 503 แต่ถ้าเราข้ามมาถึงนี่ได้ แปลว่าต้องมีไฟล์
    assert response.status_code == 400

@pytest.mark.skipif(not MODEL_EXISTS, reason="Model file not found. Skipping prediction tests.")
def test_predict_structure(test_client):
    """เช็คว่าโครงสร้าง JSON ตอบกลับถูกต้อง"""
    img = Image.new('RGB', (224, 224), color='red')
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='JPEG')
    img_byte_arr = img_byte_arr.getvalue()

    files = {'file': ('test.jpg', img_byte_arr, 'image/jpeg')}
    response = test_client.post("/predict", files=files)
    
    assert response.status_code == 200
    data = response.json()
    assert any(key in data for key in ["class", "prediction_class", "label"])
    assert "confidence_percent" in data