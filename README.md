🔐 Smart Blockchain-Based Door Lock System
A Secure, Decentralized, and Biometric-Based Access Control System

This project integrates biometric authentication (fingerprint recognition) with blockchain technology to create a tamper-proof, secure, and decentralized door lock system. Utilising Ethereum smart contracts, all access attempts are recorded transparently, eliminating security risks associated with traditional centralized databases.

Video demo link: https://drive.google.com/file/d/147HnpRNge7AVKz-W2D68FLpSRysKWj2X/view?usp=drive_link

Features
1. Fingerprint Authentication – Ensures only authorized users can unlock the door.
2. Blockchain Security – Stores access logs on Ethereum for transparency and immutability.
3. Admin Approval via MetaMask – Unauthorized access attempts trigger an admin request.
4. Web Dashboard (React.js) – Real-time monitoring and management of access logs.
5. IoT Integration (Arduino Uno + Servo Motor) – Physically unlocks/locks the door upon successful authentication.

4-Layer Architecture of the system
![image](https://github.com/user-attachments/assets/1f52c12d-882b-4a89-bcf4-d010822a29f9)



🛠️ Tech Stack

Hardware:
Arduino Uno – Controls fingerprint sensor and lock mechanism.
Fingerprint Sensor – Captures user authentication data.
Servo Motor – Acts as the physical lock/unlock mechanism.
12V Relay – Controls door locking via Arduino.

Software:
Frontend: React.js (User Interface & Access Logs Monitoring)
Backend: Node.js + Express.js (Handles authentication & blockchain interaction)
Blockchain: Ethereum (Solidity Smart Contracts, Hardhat for testing)
Web3.js: Facilitates Ethereum interactions with MetaMask

🔄 Working Mechanism

![image](https://github.com/user-attachments/assets/9e8ab4f2-a46e-493d-b8a6-7397f2d08310)


1. User places their finger on the fingerprint sensor → Data is sent to the backend.
2. System checks if the fingerprint is authorized → If not, an admin confirmation request is sent.
3. Admin approves via MetaMask → A blockchain transaction logs the access attempt.
4. Smart Contract verifies the request → If valid, the backend signals the servo motor to unlock the door.
5. Real-time web dashboard updates logs → Unauthorized attempts are logged for security.
