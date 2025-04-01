import serial
import pymongo
from datetime import datetime


ser = serial.Serial("COM6", 9600)
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["fingerprint_db"]
collection = db["attendance"]

print("📡 Waiting for fingerprint data...")

while True:
    if ser.in_waiting > 0:
        data = ser.readline().decode("utf-8").strip()
        print("📥 Received:", data)

        if "✅ Fingerprint Matched! ID:" in data:

            parts = data.split("ID: ")
            if len(parts) > 1:
                finger_id = parts[1].strip()

                timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                attendance_data = {
                    "fingerprint_id": finger_id,
                    "timestamp": timestamp,
                    "status": "Present",
                }

                collection.insert_one(attendance_data)
                print("✅ Data sent to MongoDB successfully!", attendance_data)
            else:
                print("⚠️ Failed to extract fingerprint ID.")
        else:
            print("❌ No valid fingerprint match.")
