import io
import os
import multiprocessing
import asyncio
from concurrent.futures import ProcessPoolExecutor
from contextlib import asynccontextmanager
import numpy as np
import onnxruntime as ort
from PIL import Image
from fastapi import FastAPI, File, UploadFile, HTTPException

# รายชื่อ Class (เรียงตามลำดับที่เทรนมา)
CLASS_NAMES = ["Banana", "Strawberry", "Tomato"]

# Global Variables สำหรับ High-Throughput
SESSION = None
EXECUTOR = None

# --- 1. ส่วนการจัดการ Lifecycle ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    global SESSION, EXECUTOR
    print("🚀 Starting High-Throughput System...")
    
    CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
    MODEL_PATH = os.path.join(CURRENT_DIR, "fruit_model.onnx")
    
    # เช็คไฟล์โมเดล
    if not os.path.exists(MODEL_PATH):
        print(f"⚠️ Warning: Model file NOT found at {MODEL_PATH}")
        SESSION = None
    else:
        try:
            # ทดสอบโหลดใน Main Process ก่อน
            SESSION = ort.InferenceSession(MODEL_PATH)
            print(f"✅ Model loaded successfully from: {MODEL_PATH}")
            
            # เตรียม Multiprocessing
            EXECUTOR = ProcessPoolExecutor(max_workers=multiprocessing.cpu_count())
            print(f"✅ Multiprocessing ready (Workers: {multiprocessing.cpu_count()})")
        except Exception as e:
            print(f"❌ Error initializing model (Possible LFS Issue): {e}")
            SESSION = None

    yield

    # --- ส่วน Shutdown ---
    if EXECUTOR:
        print("🛑 Shutting down system...")
        EXECUTOR.shutdown()

app = FastAPI(title="Fruit Classification MLOps API", lifespan=lifespan)

# --- 2. ฟังก์ชันทำนายผล (รันใน Worker Process) ---
def run_inference(image_bytes, model_path):
    import onnxruntime as ort
    import io
    import numpy as np
    from PIL import Image

    try:
        # Worker ต้องโหลด Session ใหม่เสมอเพื่อความปลอดภัยใน Linux
        session = ort.InferenceSession(model_path)
        
        img = Image.open(io.BytesIO(image_bytes)).convert('RGB').resize((224, 224))
        img_array = np.array(img).astype(np.float32) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # EfficientNet ImageNet normalization parameters
        # Mean: [0.485, 0.456, 0.406], Std: [0.229, 0.224, 0.225]
        mean = np.array([0.485, 0.456, 0.406]).reshape(1, 1, 1, 3).astype(np.float32)
        std = np.array([0.229, 0.224, 0.225]).reshape(1, 1, 1, 3).astype(np.float32)

        # Prepare inputs for the ONNX model
        inputs = session.get_inputs()
        input_dict = {}
        
        if len(inputs) == 3:
            # Model with normalization layers
            input_dict[inputs[0].name] = img_array  # Image input
            input_dict[inputs[1].name] = mean       # Normalization mean
            input_dict[inputs[2].name] = std        # Normalization std
        else:
            # Simple model with just image input
            input_dict[inputs[0].name] = img_array

        raw_predictions = session.run(None, input_dict)[0]
        
        # ปรับการดึงค่ารองรับทั้ง Shape [1, 3] และ [3]
        preds = np.squeeze(raw_predictions) 
        result_idx = int(np.argmax(preds))
        confidence = float(preds[result_idx])
        
        return result_idx, confidence
    except Exception as e:
        return str(e), 0.0

# --- 3. API Endpoints ---

@app.get("/")
async def read_root():
    """แยกออกมาให้ทำงานได้เสมอแม้โมเดลพัง เพื่อป้องกัน 404 ใน Pytest"""
    status = "Ready" if SESSION else "Model Missing or Corrupted (LFS Issue)"
    return {
        "message": "API is ready with High-Throughput ONNX Support!",
        "model_status": status
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # 1. เช็คความพร้อม (กัน Error 500 แบบไม่มีสาเหตุ)
    CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
    MODEL_PATH = os.path.join(CURRENT_DIR, "fruit_model.onnx")

    if not os.path.exists(MODEL_PATH):
        raise HTTPException(status_code=503, detail="Model file missing on server. Check Git LFS.")

    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="โปรดส่งไฟล์รูปภาพเท่านั้น")

    try:
        contents = await file.read()
        loop = asyncio.get_event_loop()
        
        # 2. ส่งงานเข้า Executor
        if EXECUTOR is None: # ถ้าตอน Startup โหลดไม่ผ่าน ลองโหลดใหม่ที่นี่
             raise Exception("Executor not initialized. Model might be corrupted.")

        res = await loop.run_in_executor(EXECUTOR, run_inference, contents, MODEL_PATH)
        
        if isinstance(res[0], str): # ถ้าได้ Error message กลับมา
            raise Exception(f"Inference Error: {res[0]}")
            
        result_idx, confidence = res
        
        return {
            "class": CLASS_NAMES[result_idx],
            "confidence_score": round(confidence, 4),
            "confidence_percent": f"{round(confidence * 100, 2)}%"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))