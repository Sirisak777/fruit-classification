import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
import os
import random

# --- 1. ตั้งค่าพื้นฐานแบบ Dynamic Path ---
# หาตำแหน่งของไฟล์ check_result.py แล้วถอยออกไปที่ Root ของโปรเจกต์
CURRENT_FILE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(CURRENT_FILE_DIR)

# ตั้งค่า Path ให้ชี้ไปที่จุดที่ถูกต้องเสมอ
model_path = os.path.join(PROJECT_ROOT, 'models', 'final_model', 'fruit_modelv1.h5')

# แก้เป็นโฟลเดอร์ data/strawberry (ตามโครงสร้างใหม่ที่คุณไม่มีการแยก train/val/test ในโฟลเดอร์ย่อย)
folder_to_test = os.path.join(PROJECT_ROOT, 'data', 'strawberry') 

class_names = ["Banana", "Strawberry", "Tomato"] # เรียงตามชื่อโฟลเดอร์ A-Z

# --- 2. โหลดโมเดล ---
print(f"กำลังโหลดโมเดลจาก: {model_path}")
if not os.path.exists(model_path):
    print(f"❌ ไม่พบไฟล์โมเดลที่: {model_path}")
    exit()

model = tf.keras.models.load_model(model_path)

# --- 3. สุ่มรูปภาพจากโฟลเดอร์ที่กำหนด ---
if not os.path.exists(folder_to_test):
    print(f"❌ ไม่พบโฟลเดอร์รูปภาพที่: {folder_to_test}")
    exit()

all_files = [f for f in os.listdir(folder_to_test) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
if not all_files:
    print(f"❌ ไม่พบไฟล์รูปภาพใน: {folder_to_test}")
    exit()

random_file = random.choice(all_files)
img_path = os.path.join(folder_to_test, random_file)

print(f"กำลังทดสอบรูปภาพ: {img_path}")

# --- 4. เตรียมรูปภาพ (Preprocessing) ---
img = image.load_img(img_path, target_size=(224, 224))
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0) 

# --- 5. ทายผล ---
predictions = model.predict(img_array)
score = predictions[0]

predicted_index = np.argmax(score)
predicted_class = class_names[predicted_index]
confidence = score[predicted_index] * 100

# --- 6. แสดงผลลัพธ์ ---
print("\n" + "="*40)
print(f"ไฟล์ที่สุ่มได้: {random_file}")
print(f"โมเดลทายว่า: {predicted_class}")
print(f"ความมั่นใจ: {confidence:.2f}%")
print("="*40)