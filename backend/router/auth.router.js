const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const AuthController = require("../controller/auth.controller");
const jwtAuth = require("../middleware/jwtAuth");
const sendError = require("../utils/sendError");

// Rate limiter for login (10 requests per minute per IP)
const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        return sendError(res, 429, "RATE_LIMIT", "ลองใหม่ภายหลัง");
    },
});

// Register new user
// POST /api/auth/register
router.post("/register", AuthController.register);

// Login user (with rate limiting)
// POST /api/auth/login
router.post("/login", loginLimiter, AuthController.login);

// Get current user (protected)
// GET /api/auth/me
router.get("/me", jwtAuth, AuthController.getMe);

module.exports = router;
