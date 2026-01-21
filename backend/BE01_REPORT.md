# BE-01 Setup Backend Project Report

## Current State (Audit)

### สิ่งที่มีอยู่แล้ว ✅

- **โครงสร้างโฟลเดอร์**: `backend/` มีอยู่แล้วพร้อมโครงสร้างที่ดี
  - `controller/` - 2 files
  - `datamock/` - 2 files
  - `model/` - 2 files
  - `router/` - 2 files
- **Entry file**: `index.js` (ถูกต้องตาม package.json)
- **Framework**: Express.js v5.2.1
- **package.json**: มีอยู่แล้วพร้อม scripts
  - `"start": "node index.js"` ✅
  - `"dev": "nodemon index.js"` ✅
- **Dependencies ที่มีแล้ว**:
  - express: ^5.2.1 ✅
  - cors: ^2.8.5 ✅
  - dotenv: ^17.2.3 ✅
  - bcrypt: ^6.0.0 ✅
  - mongoose: ^9.0.2 ✅
  - nodemon: ^3.1.11 ✅
- **.gitignore**: มีใน `backend/.gitignore` พร้อม ignore `.env` แล้ว ✅
- **.env.example**: มีอยู่แล้ว (แต่ขาด `CORS_ORIGIN`)
- **CORS**: ติดตั้งแล้ว แต่ใช้ `cors()` แบบไม่มี config

### สิ่งที่ขาด/ต้องปรับปรุง ❌

- **jsonwebtoken** package ยังไม่ได้ติดตั้ง
- **CORS_ORIGIN** ไม่มีใน `.env.example`
- **CORS config** ไม่ได้อ่าน origin จาก environment variable
- **/health endpoint** ไม่มี (มีแค่ `/` root เท่านั้น)
- **.env** ไฟล์ local ยังไม่มี

---

## Changes (Step 1) - Dependencies

### แก้ไข: `backend/package.json`

- เพิ่ม dependency: `jsonwebtoken`

---

## Changes (Step 2) - Environment Files

### แก้ไข: `backend/.env.example`

เพิ่ม `CORS_ORIGIN` key และปรับ PORT เป็น 3001:

```
PORT=3001
CORS_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/tcheck
JWT_SECRET=change_me
```

### สร้างใหม่: `backend/.env`

Copy จาก `.env.example` สำหรับ local development

> ⚠️ **หมายเหตุ**: `.env` ถูก ignore โดย `.gitignore` แล้ว จะไม่ถูก commit

---

## Changes (Step 3) - CORS Configuration

### แก้ไข: `backend/index.js`

- ปรับ CORS ให้อ่าน origin จาก `process.env.CORS_ORIGIN`
- รองรับหลาย origins (คั่นด้วย comma)
- ตั้งค่า methods และ credentials
- เพิ่ม `/health` endpoint

---

## How to Run / Verify (Step 4)

### คำสั่งรัน

```bash
cd backend
npm install
npm start
```

### ทดสอบ

```bash
# Health check
curl http://localhost:3001/health
# Expected: {"ok":true}

# หรือเปิด browser ไปที่
http://localhost:3001/health
```

---

## Summary

### ไฟล์ที่สร้าง/แก้ไข

| Path                     | Action                                    |
| ------------------------ | ----------------------------------------- |
| `backend/package.json`   | Modified - เพิ่ม jsonwebtoken             |
| `backend/.env.example`   | Modified - เพิ่ม CORS_ORIGIN              |
| `backend/.env`           | Created - local environment file          |
| `backend/index.js`       | Modified - CORS config + /health endpoint |
| `backend/BE01_REPORT.md` | Created - รายงานนี้                       |

### Acceptance Criteria Checklist

- [x] npm start รันได้
- [x] มี .env และไม่ถูก commit (`.gitignore` ครอบคลุมแล้ว)
- [x] CORS ทำงานและอ่าน origin จาก env (`CORS_ORIGIN`)
- [x] มี libs ที่จำเป็นครบ (express, dotenv, cors, bcrypt, jsonwebtoken, mongoose)
- [x] มี /health endpoint

---

## ข้อควรระวัง

> ⚠️ **อย่า commit ไฟล์ `.env`** - มี sensitive data เช่น JWT_SECRET
