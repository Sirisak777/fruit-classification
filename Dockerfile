FROM python:3.10-slim

WORKDIR /app

# ติดตั้ง System Dependencies สำหรับ Image Processing
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# 1. ติดตั้ง Dependencies (ชี้ไปที่โฟลเดอร์เดิม)
COPY deployment/api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 2. ก๊อปปี้ไฟล์โมเดล และโค้ดทั้งหมดจากโฟลเดอร์ api มาไว้ที่ root ของ container
COPY deployment/api/fruit_model_quantized.onnx .
COPY deployment/api/main.py .

# 3. ก๊อปปี้โฟลเดอร์ tests (ถ้าต้องการ)
COPY tests/ ./tests/

# สั่งรัน API (เนื่องจากเรา COPY มาไว้ที่ /app แล้ว เลยเรียกตรงๆ ได้เลย)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]