---
title: Fruit Classification App
emoji: 🍎
colorFrom: green
colorTo: yellow
sdk: docker
app_port: 8000
pinned: false
---

# 🍎 Fruit Classification MLOps Challenge

โปรเจกต์ระบบจำแนกประเภทผลไม้ระดับ High-Throughput ที่เน้นการทำ Model Optimization และการส่งมอบงานอัตโนมัติ (CI/CD) ตามมาตรฐาน MLOps

## 🚀 คุณสมบัติของโปรเจกต์ (Key Features)
* **Model Optimization:** เลือกใช้ EfficientNetB0 จาก Hugging Face และนำมาทำ Dynamic Quantization (INT8) ในรูปแบบ ONNX Format เพื่อให้โมเดลมีขนาดเล็กและประมวลผลได้เร็วที่สุด
* **High-Throughput API:** พัฒนาด้วย FastAPI โดยใช้ `async def` สำหรับรับส่งข้อมูล และใช้ `ProcessPoolExecutor` (Multiprocessing) ในการรันโมเดลเพื่อป้องกัน API Frozen (Concurrency Support)
* **Production Error Handling:** ใช้ **Pydantic** ตรวจสอบความถูกต้องของข้อมูล (Input Validation) และรองรับการดักจับ Error กรณีไฟล์ไม่ใช่รูปภาพ หรือไฟล์เสียหาย
* **CI/CD Pipeline:** ระบบทดสอบอัตโนมัติ (Unit Testing) และ Deploy ไปยัง Hugging Face Spaces ทันทีเมื่อผ่านการทดสอบ 100%

## 📊 Performance Benchmark (Data Collection)
ผลการเปรียบเทียบประสิทธิภาพระหว่างโมเดลต้นฉบับ (Baseline) และโมเดลที่ผ่านการปรับแต่ง (Optimized):

| Metric | Original (.h5) | Optimized (.onnx) | Improvement |
| :--- | :---: | :---: | :---: |
| **Model Size** | 15.99 MB | **4.27 MB** | **✨ 73.33% Smaller** |
| **Inference Latency** | 81.26 ms | **46.54 ms** | **🚀 1.75x Faster** |

> **วิเคราะห์ผล:** การทำ Quantization ช่วยลดขนาดโมเดลลงได้อย่างมีนัยสำคัญ (เหลือเพียง 1/4 ของขนาดเดิม) ในขณะที่ความเร็ว (Latency) เพิ่มขึ้นเกือบ 2 เท่า ทำให้ระบบสามารถรองรับ Throughput (TPS) ได้สูงขึ้นบนทรัพยากรที่จำกัด

## 📁 โครงสร้างโปรเจกต์ (Project Structure)
* `.github/workflows/`: เก็บไฟล์ CI/CD Config (`ci-cd.yml`)
* `deployment/api/`: ไฟล์สำหรับ Production (Dockerfile, `main.py`, Optimized Model)
* `models/`: จัดเก็บ Model Baseline (.h5) และผลการประเมิน
* `src/`: Source code สำหรับการทำ Training และ Model Conversion
* `tests/`: ชุดทดสอบ Unit Testing สำหรับเช็ค API Endpoint และ Model Output

## 🛠 การติดตั้งและใช้งาน (Deployment)

### 1. การรันผ่าน Docker (Local)
```bash
# Build Image
docker build -t fruit-mlops-onnx -f deployment/api/Dockerfile deployment/api/

# Run Container
docker run -p 8000:8000 fruit-mlops-onnx