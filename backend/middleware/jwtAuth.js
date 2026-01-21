const jwt = require("jsonwebtoken");

/**
 * JWT Authentication Middleware
 * Verifies JWT token from Authorization header
 * Attaches user info to req.user
 */
const jwtAuth = (req, res, next) => {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check if header exists
    if (!authHeader) {
        return res.status(401).json({
            ok: false,
            error: {
                code: "MISSING_TOKEN",
                message: "กรุณาเข้าสู่ระบบ",
            },
        });
    }

    // Check Bearer format
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({
            ok: false,
            error: {
                code: "INVALID_TOKEN",
                message: "Token ไม่ถูกต้อง",
            },
        });
    }

    const token = parts[1];

    // Check JWT_SECRET
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error("JWT_SECRET is not defined");
        return res.status(500).json({
            ok: false,
            error: {
                code: "SERVER_MISCONFIG",
                message: "JWT secret ไม่ถูกตั้งค่า",
            },
        });
    }

    // Verify token
    try {
        const payload = jwt.verify(token, jwtSecret);

        // Attach user to request
        req.user = {
            id: payload.sub,
            email: payload.email,
            username: payload.username,
        };

        return next();
    } catch (error) {
        // Token expired
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                ok: false,
                error: {
                    code: "TOKEN_EXPIRED",
                    message: "Token หมดอายุ",
                },
            });
        }

        // Invalid token
        return res.status(401).json({
            ok: false,
            error: {
                code: "INVALID_TOKEN",
                message: "Token ไม่ถูกต้อง",
            },
        });
    }
};

module.exports = jwtAuth;
