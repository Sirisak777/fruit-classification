# 🍎 Fruit Classification API (High-Throughput)

ระบบจำแนกประเภทผลไม้ (**Banana**, **Strawberry**, **Tomato**) พัฒนาด้วย **FastAPI** และ **ONNX Runtime** โดยเน้นประสิทธิภาพการทำงานแบบ High-Concurrency ด้วยเทคนิค Multiprocessing และการจัดการแบบ Asynchronous

## 🏗️ โครงสร้างโปรเจกต์ (Project Structure)
- `deployment/api/main.py`: ไฟล์หลักสำหรับรัน FastAPI และจัดการระบบ Inference
- `deployment/api/fruit_model_quantized.onnx`: ไฟล์โมเดลที่ผ่านการทำ Optimization (Quantization)
- `.github/workflows/`: ไฟล์การตั้งค่า CI/CD Pipeline สำหรับรัน Unit Test อัตโนมัติ
- `tests/`: ชุดการทดสอบระบบด้วย Pytest
- `requirements.txt`: รายการ Library ทั้งหมดที่จำเป็น

---

## 🛠️ วิธีการติดตั้งและรันระบบ (Setup & Installation)

### ทางเลือกที่ 1: การรันแบบ Local Development (Python)
1. **ติดตั้ง Dependencies:**
   ```bash
   pip install -r requirements.txt
```
2. **รัน API Server:**

```bash
uvicorn deployment.api.main:app --host 0.0.0.0 --port 8000 --reload
```
เข้าชม Swagger UI ได้ที่: http://localhost:8000/docs

ทางเลือกที่ 2: การรันผ่าน Docker
Build Image:

```bash
docker build -t fruit-app .
```
Run Container:

```bash
docker run -d -p 8000:8000 fruit-app
```
☁️ การใช้งานบน Cloud (API Reference)
เมื่อทำการ Deploy บน Cloud (เช่น Hugging Face Spaces) สามารถเรียกใช้ API ได้ผ่านคำสั่ง cURL ดังนี้:

1. **ตรวจสอบสถานะระบบ (Health Check)**
Method: GET | Endpoint: /

```bash
curl -X GET "https://<YOUR_CLOUD_URL>/" -H "accept: application/json"
```
2. **ทำนายประเภทผลไม้ (Prediction)**
Method: POST | Endpoint: /predict

**ตัวอย่างสำหรับทดสอบบนเครื่องตัวเอง (Local)**

```PowerShell
curl.exe -X POST "https://localhost:8000/predict" `
     -H "accept: application/json" `
     -H "Content-Type: multipart/form-data" `
     -F "file=@C:\path\to\your\banana.jpg"
```

**สำหรับใช้งานบนระบบ Cloud:**
คำสั่งสำหรับ Windows PowerShell:

```PowerShell
curl.exe -X POST "https://<YOUR_CLOUD_URL>/predict" `
     -H "accept: application/json" `
     -H "Content-Type: multipart/form-data" `
     -F "file=@C:\path\to\your\fruit_image.jpg"
```
คำสั่งสำหรับ Linux / macOS:

```bash
curl -X POST "https://<YOUR_CLOUD_URL>/predict" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@/path/to/your/fruit_image.jpg"
```
