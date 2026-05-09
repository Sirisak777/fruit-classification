import tensorflow as tf
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras import layers, models
import os

# --- 1. การจัดการ Path อัจฉริยะ (รันจากที่ไหนก็เจอ) ---
# หาตำแหน่งของไฟล์ train.py แล้วถอยออกมา 1 ชั้น เพื่อไปที่โฟลเดอร์หลักของโปรเจกต์
CURRENT_FILE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(CURRENT_FILE_DIR)

# ตั้งค่า Path ต่างๆ โดยอิงจาก PROJECT_ROOT
DATA_PATH = os.path.join(PROJECT_ROOT, 'data')
PATH_MASTER = os.path.join(PROJECT_ROOT, 'models', 'final_model')
PATH_DEPLOY = os.path.join(PROJECT_ROOT, 'deployment', 'api')

IMG_SIZE = 224
BATCH_SIZE = 32
NUM_CLASSES = 3 

print(f"📂 กำลังโหลดข้อมูลจาก: {DATA_PATH}")

# --- 2. แบ่งข้อมูลอัตโนมัติ (80% Train, 10% Val, 10% Test) ---
# ดึง 80% แรกมาเป็นชุด Training
train_ds = tf.keras.utils.image_dataset_from_directory(
    DATA_PATH,
    validation_split=0.2,
    subset="training",
    seed=123,
    image_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    label_mode='categorical'
)

# ดึงอีก 20% ที่เหลือมาเพื่อแบ่งเป็น Val และ Test
remaining_ds = tf.keras.utils.image_dataset_from_directory(
    DATA_PATH,
    validation_split=0.2,
    subset="validation",
    seed=123,
    image_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    label_mode='categorical'
)

# สุ่มแบ่งครึ่ง 20% นั้น (จะได้ Val 10% และ Test 10%)
dataset_batches = tf.data.experimental.cardinality(remaining_ds).numpy()
val_ds = remaining_ds.take(dataset_batches // 2)
test_ds = remaining_ds.skip(dataset_batches // 2)

print(f"✅ แบ่งข้อมูลสำเร็จ: Train {len(train_ds)} batches, Val {len(val_ds)} batches, Test {len(test_ds)} batches")

# --- 3. สร้าง Model (EfficientNet-B0) ---
base_model = EfficientNetB0(weights='imagenet', include_top=False, input_shape=(IMG_SIZE, IMG_SIZE, 3))
base_model.trainable = False 

model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.BatchNormalization(),
    layers.Dropout(0.2),
    layers.Dense(NUM_CLASSES, activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# --- 4. เริ่มเทรน (Training Phase) ---
print("\n--- 🚀 เริ่มการเทรนโมเดล ---")
model.fit(train_ds, validation_data=val_ds, epochs=5)

# --- 5. ทดสอบปลายภาค (Final Evaluation) ---
print("\n--- 📊 เริ่มการทดสอบด้วยชุด Test Set ---")
test_loss, test_acc = model.evaluate(test_ds)
print(f"\n✅ Final Test Accuracy: {test_acc*100:.2f}%")

# --- 6. เซฟโมเดล 2 ที่ (Master และ Deployment) ---
os.makedirs(PATH_MASTER, exist_ok=True)
os.makedirs(PATH_DEPLOY, exist_ok=True)

# บันทึกไฟล์ h5v1
model.save(os.path.join(PATH_MASTER, 'fruit_modelv1.h5'))
model.save(os.path.join(PATH_DEPLOY, 'fruit_modelv1.h5'))

print(f"\n🎉 สำเร็จ! เซฟโมเดลไปที่:\n1. {PATH_MASTER}\n2. {PATH_DEPLOY}")