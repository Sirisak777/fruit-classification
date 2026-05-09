from locust import HttpUser, task, between

class FruitApiLoadTest(HttpUser):
    # จำลอง user รอระหว่างยิง 0.5 - 2 วินาที
    wait_time = between(0.5, 2)

    @task
    def test_predict_endpoint(self):
        # ต้องมีไฟล์รูป test.jpg อยู่ในโฟลเดอร์เดียวกับสคริปต์นี้
        with open("test_image.jpg", "rb") as image_file:
            self.client.post(
                "/predict", 
                files={"file": ("test.jpg", image_file, "image/jpeg")}
            )

# รันด้วยคำสั่ง: locust -f load_test.py --host http://localhost:8000