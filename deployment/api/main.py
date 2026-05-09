import io
import os
import multiprocessing
import asyncio
from concurrent.futures import ProcessPoolExecutor
from contextlib import asynccontextmanager # เพิ่มสำหรับการจัดการ Lifecycle
import numpy as np
import onnxruntime as ort
from PIL import Image
from fastapi import FastAPI, File, UploadFile, HTTPException

# รายชื่อ Class (เรียงตามลำดับที่เทรนมา)
CLASS_NAMES = ["Banana", "Strawberry", "Tomato"]

# Global Variables สำหรับ High-Throughput
SESSION = None
EXECUTOR = None

# --- 1. ส่วนการจัดการ Lifecycle (Startup/Shutdown แบบใหม่) ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    global SESSION, EXECUTOR
    print("🚀 Starting High-Throughput System...")
    
    # กำหนด Path โมเดลให้แม่นยำ
    CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
    MODEL_PATH = os.path.join(CURRENT_DIR, "fruit_model_quantized.onnx")
    
    # ตรวจสอบว่ามีไฟล์โมเดลไหม (ป้องกันแอปค้างถ้าเรายังไม่ได้ Upload ไฟล์)
    if not os.path.exists(MODEL_PATH):
        print(f"⚠️ Warning: Model file NOT found at {MODEL_PATH}")
        SESSION = None
    else:
        try:
            # โหลดโมเดลผ่าน ONNX Runtime
            SESSION = ort.InferenceSession(MODEL_PATH)
            print(f"✅ Model loaded successfully from: {MODEL_PATH}")
            
            # เตรียม Multiprocessing
            EXECUTOR = ProcessPoolExecutor(max_workers=multiprocessing.cpu_count())
            print(f"✅ Multiprocessing ready (Workers: {multiprocessing.cpu_count()})")
        except Exception as e:
            print(f"❌ Error initializing model: {e}")
            SESSION = None

    yield # ช่วงที่แอปทำงาน

    # --- ส่วน Shutdown ---
    print("🛑 Shutting down system...")
    if EXECUTOR:
        EXECUTOR.shutdown()

# ประกาศแอปพร้อมใช้งาน lifespan
app = FastAPI(title="Fruit Classification MLOps API", lifespan=lifespan)

# --- 2. ฟังก์ชันทำนายผล (รันใน Worker Process) ---
# --- แก้ไขส่วนที่ 2: ฟังก์ชันทำนายผล ---
# --- แก้ไขส่วนที่ 2 ใน main.py: ฟังก์ชันทำนายผล ---
def run_inference(image_bytes, model_path):
    # ต้อง import ภายในฟังก์ชันสำหรับ Worker Process
    import onnxruntime as ort
    import io
    import numpy as np
    from PIL import Image

    try:
        # สร้าง Session ใหม่ใน Worker เสมอ (ป้องกัน Memory Access Error ใน Linux)
        session = ort.InferenceSession(model_path)
        
        img = Image.open(io.BytesIO(image_bytes)).convert('RGB').resize((224, 224))
        img_array = np.array(img).astype(np.float32) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        input_name = session.get_inputs()[0].name
        raw_predictions = session.run(None, {input_name: img_array})[0]
        
        # ปรับการดึงค่าเพื่อรองรับทั้ง Shape [1, 3] และ [3]
        preds = np.squeeze(raw_predictions) 
        result_idx = int(np.argmax(preds))
        confidence = float(preds[result_idx])
        
        return result_idx, confidence
    except Exception as e:
        # ส่ง Error กลับไปหา Main Process เพื่อให้รู้ว่าพังที่ตรงไหน
        return str(e), 0.0

# --- แก้ไขส่วนที่ 3 ใน main.py: API Endpoints ---
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="โปรดส่งไฟล์รูปภาพเท่านั้น")

    try:
        contents = await file.read()
        loop = asyncio.get_event_loop()
        
        # ตรวจหา Path โมเดลอีกครั้งเพื่อความชัวร์
        CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
        MODEL_PATH = os.path.join(CURRENT_DIR, "fruit_model_quantized.onnx")

        # ส่งงานเข้า Executor
        res = await loop.run_in_executor(EXECUTOR, run_inference, contents, MODEL_PATH)
        
        # ถ้า Worker ส่ง Error Message กลับมา (เป็น string)
        if isinstance(res[0], str):
            raise Exception(f"Worker Error: {res[0]}")
            
        result_idx, confidence = res
        
        # ป้องกัน Index Error ถ้าโมเดลทำนายออกมาเกินจำนวน Class ที่เราตั้งไว้
        if result_idx >= len(CLASS_NAMES):
            result_idx = 0 # Default หรือจัดการตามเหมาะสม

        return {
            "class": CLASS_NAMES[result_idx],
            "confidence_score": round(confidence, 4),
            "confidence_percent": f"{round(confidence * 100, 2)}%"
        }
    except Exception as e:
        # ส่ง Error รายละเอียดออกไปให้ Pytest เห็น
        raise HTTPException(status_code=500, detail=str(e))