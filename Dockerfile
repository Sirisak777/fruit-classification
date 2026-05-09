FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# 1. ติดตั้ง Dependencies (ชี้ไปที่ Path เต็มจาก Root)
COPY deployment/api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 2. ก๊อปปี้ไฟล์โมเดล (ต้องระบุ Path ให้ครบถ้วน)
# สังเกตตรงนี้: เราดึงจาก deployment/api/ มาไว้ที่ . (ซึ่งก็คือ /app ใน container)
COPY deployment/api/fruit_model_quantized.onnx .

# 3. ก๊อปปี้โค้ด API
COPY deployment/api/main.py .

# 4. ก๊อปปี้โฟลเดอร์ tests (ถ้ามีอยู่นอกสุด)
COPY tests/ ./tests/

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]