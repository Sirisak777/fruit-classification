import tensorflow as tf
import tf2onnx
import onnx
from onnxruntime.quantization import quantize_dynamic, QuantType
import os
import shutil

# --- 1. การจัดการ Path ---
CURRENT_FILE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(CURRENT_FILE_DIR)

H5_MODEL_PATH = os.path.join(PROJECT_ROOT, 'models', 'final_model', 'fruit_modelv1.h5')
PATH_MASTER = os.path.join(PROJECT_ROOT, 'models')
PATH_DEPLOY = os.path.join(PROJECT_ROOT, 'deployment', 'api')

TEMP_SAVED_MODEL = os.path.join(PATH_MASTER, "temp_saved_model")
TEMP_ONNX = os.path.join(PATH_MASTER, "temp.onnx")
FINAL_ONNX_NAME = "fruit_model_quantized.onnx"

print(f"🔄 กำลังโหลดโมเดลจาก: {H5_MODEL_PATH}")
model = tf.keras.models.load_model(H5_MODEL_PATH)

# --- 2. แก้ปัญหา KeyError ด้วยการแปลงผ่าน SavedModel ---
print("🚀 ขั้นตอนที่ 1: เตรียมการแปลง (Keras -> SavedModel)...")
# ลบโฟลเดอร์ชั่วคราวถ้ามีอยู่เดิม
if os.path.exists(TEMP_SAVED_MODEL):
    shutil.rmtree(TEMP_SAVED_MODEL)

# เซฟเป็น SavedModel เพื่อล้างชื่อ Tensor ที่มีปัญหา
model.export(TEMP_SAVED_MODEL) 

print("🚀 ขั้นตอนที่ 2: แปลง (SavedModel -> ONNX)...")
# ใช้คำสั่งแปลงจาก SavedModel แทนการแปลงจาก Keras โดยตรง
cmd = f"python -m tf2onnx.convert --saved-model \"{TEMP_SAVED_MODEL}\" --output \"{TEMP_ONNX}\" --opset 13"
os.system(cmd)

# --- 3. ทำ Dynamic Quantization ---
print("🚀 ขั้นตอนที่ 3: ทำ Dynamic Quantization (ลดขนาดไฟล์)...")

output_master = os.path.join(PATH_MASTER, FINAL_ONNX_NAME)
output_deploy = os.path.join(PATH_DEPLOY, FINAL_ONNX_NAME)

if os.path.exists(TEMP_ONNX):
    quantize_dynamic(
        TEMP_ONNX,
        output_master,
        weight_type=QuantType.QUInt8
    )
    
    # ก๊อปปี้ไปที่ Deployment
    shutil.copy2(output_master, output_deploy)
    print("✅ บันทึกโมเดล Quantized สำเร็จ!")
else:
    print("❌ การแปลงเป็น ONNX ล้มเหลว โปรดเช็ค Log ด้านบน")
    exit()

# --- 4. ลบไฟล์ขยะและสรุปผล ---
if os.path.exists(TEMP_SAVED_MODEL): shutil.rmtree(TEMP_SAVED_MODEL)
if os.path.exists(TEMP_ONNX): os.remove(TEMP_ONNX)

size_h5 = os.path.getsize(H5_MODEL_PATH) / (1024 * 1024)
size_onnx = os.path.getsize(output_master) / (1024 * 1024)

print("\n📊 --- สรุปผลลัพธ์ ---")
print(f"📦 ขนาดเดิม (.h5): {size_h5:.2f} MB")
print(f"📦 ขนาดใหม่ (Quantized ONNX): {size_onnx:.2f} MB")
print(f"📉 ลดขนาดลงได้: {((size_h5 - size_onnx) / size_h5) * 100:.2f}%")