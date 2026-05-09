import time
import os
import numpy as np
import onnxruntime as ort
import tensorflow as tf

# --- 1. การจัดการ Path ---
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

# กำหนด Path ตามโครงสร้างโปรเจกต์
H5_PATH = os.path.join(CURRENT_DIR, 'models', 'final_model', 'fruit_modelv1.h5')
ONNX_PATH = os.path.join(CURRENT_DIR, 'deployment', 'api', 'fruit_model.onnx') 
ONNX_QUANT_PATH = os.path.join(CURRENT_DIR, 'deployment', 'api', 'fruit_model_quantized.onnx')

def get_file_size(path):
    if not os.path.exists(path):
        return None
    return os.path.getsize(path) / (1024 * 1024)  # แปลงเป็น MB

def run_benchmark(path, is_h5=False):
    if not os.path.exists(path):
        return None
    
    try:
        if is_h5:
            model = tf.keras.models.load_model(path, compile=False)
            dummy_input = np.random.randn(1, 224, 224, 3).astype(np.float32)
            # Warm up
            model.predict(dummy_input, verbose=0)
            start = time.time()
            for _ in range(20): 
                model.predict(dummy_input, verbose=0)
        else:
            session = ort.InferenceSession(path)
            # แก้ไขจุดนี้: ดึง Input ทั้งหมดที่โมเดลต้องการเพื่อป้องกัน Error Missing Input Feed
            input_info = session.get_inputs()
            input_feed = {}
            
            for inp in input_info:
                # สร้าง Shape จำลองตามที่โมเดลต้องการ
                shape = [dim if isinstance(dim, int) and dim > 0 else 1 for dim in inp.shape]
                input_feed[inp.name] = np.random.randn(*shape).astype(np.float32)
            
            # Warm up
            session.run(None, input_feed)
            start = time.time()
            for _ in range(20): 
                session.run(None, input_feed)
        
        return ((time.time() - start) / 20) * 1000
    except Exception as e:
        print(f"❌ Error benchmarking {os.path.basename(path)}: {e}")
        return None

# --- เริ่มการทดสอบ ---
print("⏳ กำลังเริ่มการ Benchmark... (อาจใช้เวลาสักครู่)")

s_h5 = get_file_size(H5_PATH)
s_onnx = get_file_size(ONNX_PATH)
s_quant = get_file_size(ONNX_QUANT_PATH)

l_h5 = run_benchmark(H5_PATH, is_h5=True)
l_onnx = run_benchmark(ONNX_PATH)
l_quant = run_benchmark(ONNX_QUANT_PATH)

# --- 3. ส่วนแสดงผลลัพธ์ ---
print("\n" + "="*65)
print("📊 MLOps PERFORMANCE REPORT: ORIGINAL VS ONNX VS QUANTIZED")
print("="*65)
print(f"{'Model Type':<25} | {'Size (MB)':<12} | {'Latency (ms)':<15}")
print("-" * 65)

# แสดงผล Original .h5
if l_h5 is not None:
    print(f"{'1. Original (.h5)':<25} | {s_h5:>9.2f} MB | {l_h5:>12.2f} ms")
else:
    print(f"{'1. Original (.h5)':<25} | {'Not Found':>12} | {'N/A':>15}")

# แสดงผล ONNX FP32
if l_onnx is not None:
    print(f"{'2. ONNX (FP32)':<25} | {s_onnx:>9.2f} MB | {l_onnx:>12.2f} ms")
else:
    # หากขึ้น Not Found ให้เช็คว่าไฟล์ชื่อ fruit_model.onnx อยู่ใน deployment/api/ จริงไหม
    print(f"{'2. ONNX (FP32)':<25} | {'Not Found':>12} | {'N/A':>15}")

# แสดงผล ONNX Quantized
if l_quant is not None:
    print(f"{'3. ONNX Quantized (INT8)':<25} | {s_quant:>9.2f} MB | {l_quant:>12.2f} ms")
else:
    print(f"{'3. ONNX Quantized (INT8)':<25} | {'Not Found':>12} | {'N/A':>15}")

print("-" * 65)

# --- 4. สรุปผล ---
if l_h5 and l_quant:
    speed_up = l_h5 / l_quant
    size_reduction = ((s_h5 - s_quant) / s_h5) * 100
    print(f"🚀 สรุป: โมเดล Quantized เร็วขึ้น {speed_up:.2f} เท่า!")
    print(f"📦 สรุป: ขนาดไฟล์ลดลง {size_reduction:.2f}% จากโมเดลต้นฉบับ")
else:
    print("⚠️ ข้อมูลไม่ครบถ้วน: โปรดตรวจสอบ Path และไฟล์โมเดลอีกครั้ง")

print("="*65)