import time
import os
import numpy as np
import onnxruntime as ort
import tensorflow as tf

# --- 1. การจัดการ Path ---
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
H5_PATH = os.path.join(CURRENT_DIR, 'models', 'final_model', 'fruit_modelv1.h5')
ONNX_PATH = os.path.join(CURRENT_DIR, 'deployment', 'api', 'fruit_model_quantized.onnx')

def get_file_size(path):
    size_bytes = os.path.getsize(path)
    return size_bytes / (1024 * 1024)  # แปลงเป็น MB

def benchmark_speed():
    dummy_input = np.random.randn(1, 224, 224, 3).astype(np.float32)
    
    # ทดสอบความเร็ว .h5 (TensorFlow)
    print("⏳ กำลังทดสอบความเร็ว Original Model (.h5)...")
    model_h5 = tf.keras.models.load_model(H5_PATH, compile=False)
    # Warm up
    model_h5.predict(dummy_input, verbose=0)
    start = time.time()
    for _ in range(20): model_h5.predict(dummy_input, verbose=0)
    avg_h5 = ((time.time() - start) / 20) * 1000 # ms

    # ทดสอบความเร็ว .onnx (ONNX Runtime)
    print("⏳ กำลังทดสอบความเร็ว Optimized Model (.onnx)...")
    session = ort.InferenceSession(ONNX_PATH)
    input_name = session.get_inputs()[0].name
    # Warm up
    session.run(None, {input_name: dummy_input})
    start = time.time()
    for _ in range(20): session.run(None, {input_name: dummy_input})
    avg_onnx = ((time.time() - start) / 20) * 1000 # ms
    
    return avg_h5, avg_onnx

# --- ส่วนแสดงผลลัพธ์ ---
print("\n" + "="*40)
print("📊 MLOps PERFORMANCE REPORT")
print("="*40)

# เช็คขนาดไฟล์
size_h5 = get_file_size(H5_PATH)
size_onnx = get_file_size(ONNX_PATH)

print(f"📦 [Model Size]")
print(f"   - Original (.h5): {size_h5:.2f} MB")
print(f"   - Optimized (.onnx): {size_onnx:.2f} MB")
print(f"   ✨ ลดขนาดลงได้: {((size_h5 - size_onnx) / size_h5) * 100:.2f}%")

# เช็คความเร็ว
latency_h5, latency_onnx = benchmark_speed()

print(f"\n⏱ [Inference Latency]")
print(f"   - Original (.h5): {latency_h5:.2f} ms / image")
print(f"   - Optimized (.onnx): {latency_onnx:.2f} ms / image")
print(f"   🚀 เร็วขึ้น: {latency_h5 / latency_onnx:.2f} เท่า!")
print("="*40)