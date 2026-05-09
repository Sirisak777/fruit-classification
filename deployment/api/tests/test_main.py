import pytest
from fastapi.testclient import TestClient
import os
import sys
import io
from PIL import Image

# นำทางไปหา main.py
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'deployment', 'api'))
from main import app

# สร้าง Fixture เพื่อรัน Startup/Shutdown ครั้งเดียวตลอดการทดสอบ
@pytest.fixture(scope="module")
def test_client():
    # คำสั่ง 'with' ตรงนี้จะรัน Startup Event ของ FastAPI
    with TestClient(app) as client:
        yield client  # ส่ง client ไปให้ฟังก์ชันเทสต่างๆ ใช้

def test_read_root(test_client):
    """เช็คว่า API Endpoint หลักทำงานได้"""
    response = test_client.get("/")
    assert response.status_code == 200
    assert "ONNX" in response.json()["message"]

def test_predict_incorrect_file_type(test_client):
    """เช็ค Error Handling: กรณีส่งไฟล์ไม่ใช่รูปภาพ"""
    files = {'file': ('test.txt', b'not an image', 'text/plain')}
    response = test_client.post("/predict", files=files)
    assert response.status_code == 400

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
    # เช็ค key ให้ตรงกับ main.py
    assert any(key in data for key in ["class", "prediction_class", "label"])
    assert "confidence_percent" in data