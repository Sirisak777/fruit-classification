from locust import HttpUser, task, between
import os

class FruitApiUser(HttpUser):
    # สุ่มเวลารอ 1-3 วินาที เพื่อจำลองพฤติกรรมคนใช้งานจริง
    wait_time = between(1, 3) 

    @task
    def predict_endpoint(self):
        # ⚠️ ต้องมีไฟล์ชื่อ test_image.jpg วางคู่กับไฟล์นี้ด้วยนะครับ
        image_path = "test_image.jpg"
        
        if os.path.exists(image_path):
            with open(image_path, "rb") as image_file:
                # ส่งไฟล์ไปที่ Path /predict (เช็คใน main.py ว่าใช้ชื่อนี้ไหม)
                # files={"file": ...} คำว่า "file" ต้องตรงกับที่ตั้งใน FastAPI
                self.client.post(
                    "/predict", 
                    files={"file": ("test.jpg", image_file, "image/jpeg")}
                )
        else:
            # ถ้าไม่มีรูป มันจะยิงหน้าแรกแทนเพื่อไม่ให้ Error พัง
            self.client.get("/")
            print("Warning: test_image.jpg not found, hitting homepage instead.")