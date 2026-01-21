const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const AuthController = require("../controller/auth.controller");

// Rate limiter for login (10 requests per minute per IP)
const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        return res.status(429).json({
            ok: false,
            error: {
                code: "RATE_LIMIT",
                message: "ลองใหม่ภายหลัง",
            },
        });
    },
});

// Register new user
// POST /api/auth/register
router.post("/register", AuthController.register);

// Login user (with rate limiting)
// POST /api/auth/login
router.post("/login", loginLimiter, AuthController.login);

module.exports = router;
