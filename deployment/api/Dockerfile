FROM python:3.10-slim

WORKDIR /app

# แก้ไขส่วนนี้: ใช้ libgl1 และ libglib2.0-0 แทนตัวเดิมที่มีปัญหา
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# 1. ติดตั้ง Dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 2. ก๊อปปี้ไฟล์โมเดลที่ Optimize แล้ว (ONNX)
COPY fruit_model_quantized.onnx .

# 3. ก๊อปปี้โค้ด API
COPY main.py .

COPY tests/ ./tests/

# สั่งรัน API
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]