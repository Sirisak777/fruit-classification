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
def run_inference(image_bytes, model_path):
    global SESSION
    # สำคัญมาก: ใน Linux Worker ต้องสร้าง Session ของตัวเองเท่านั้น ห้ามใช้ร่วมกับ Main
    if SESSION is None:
        import onnxruntime as ort # Import ข้างในเพื่อความชัวร์ใน Worker
        SESSION = ort.InferenceSession(model_path)
    
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB').resize((224, 224))
    img_array = np.array(img).astype(np.float32)
    
    # ปกติโมเดลส่วนใหญ่ต้องหาร 255.0 (ถ้าไม่ทำ Confidence อาจจะเพี้ยนหรือ Error ได้)
    img_array /= 255.0 
    img_array = np.expand_dims(img_array, axis=0)

    input_name = SESSION.get_inputs()[0].name
    # ตรวจสอบ Shape ว่าเป็น [1, 224, 224, 3] หรือ [1, 3, 224, 224] ตามที่โมเดลเทรนมา
    predictions = SESSION.run(None, {input_name: img_array})[0]
    
    prob = predictions[0] 
    result_idx = np.argmax(prob)
    confidence = float(prob[result_idx])
    
    return result_idx, confidence

# --- 3. API Endpoints ---

@app.get("/")
def read_root():
    # บอกสถานะโมเดลให้เรารู้ตอนเช็คหน้าเว็บ
    status = "Ready" if SESSION else "Missing Model File"
    return {
        "message": "API is ready with High-Throughput ONNX Support!",
        "model_status": status
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # 1. เช็คความพร้อมของระบบ
    if SESSION is None and not os.path.exists(os.path.join(os.path.dirname(__file__), "fruit_model_quantized.onnx")):
        raise HTTPException(status_code=503, detail="Model is not ready. Please upload the .onnx file to the Space.")

    # 2. เช็คประเภทไฟล์
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="โปรดส่งไฟล์รูปภาพเท่านั้น")

    try:
        contents = await file.read()
        
        # 3. ส่งงานไปทำใน Process Pool
        loop = asyncio.get_event_loop()
        CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
        MODEL_PATH = os.path.join(CURRENT_DIR, "fruit_model_quantized.onnx")
        
        # ส่ง Path เข้าไปด้วยเพื่อให้ Worker โหลดโมเดลได้เองถ้าจำเป็น
        result_idx, confidence = await loop.run_in_executor(EXECUTOR, run_inference, contents, MODEL_PATH)
        
        return {
            "class": CLASS_NAMES[result_idx],
            "confidence_score": round(confidence, 4),
            "confidence_percent": f"{round(confidence * 100, 2)}%"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"เกิดข้อผิดพลาดในการทำนาย: {str(e)}")