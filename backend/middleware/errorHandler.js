const sendError = require("../utils/sendError");
const AppError = require("../utils/AppError");

/**
 * Central Error Handler for Express
 * Catches all errors and sends standardized responses
 */
const errorHandler = (err, req, res, next) => {
    // Log error for debugging
    console.error("Error:", err.message);
    if (process.env.NODE_ENV !== "production") {
        console.error(err.stack);
    }

    // Handle AppError (our custom errors)
    if (err instanceof AppError) {
        return sendError(res, err.status, err.code, err.message, err.details);
    }

    // Handle Mongoose ValidationError
    if (err.name === "ValidationError") {
        const fields = Object.fromEntries(
            Object.entries(err.errors).map(([key, val]) => [key, val.message])
        );
        return sendError(res, 400, "VALIDATION_ERROR", "ข้อมูลไม่ถูกต้อง", { fields });
    }

    // Handle Mongoose CastError (invalid ObjectId)
    if (err.name === "CastError") {
        return sendError(res, 400, "INVALID_ID", "ID ไม่ถูกต้อง");
    }

    // Handle MongoDB Duplicate Key Error
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        const code = field === "email" ? "EMAIL_EXISTS" : "DUPLICATE_KEY";
        const message = field === "email" ? "อีเมลนี้ถูกใช้แล้ว" : `${field} นี้ถูกใช้แล้ว`;
        return sendError(res, 409, code, message);
    }

    // Handle JWT errors (backup - jwtAuth should handle these)
    if (err.name === "JsonWebTokenError") {
        return sendError(res, 401, "INVALID_TOKEN", "Token ไม่ถูกต้อง");
    }

    if (err.name === "TokenExpiredError") {
        return sendError(res, 401, "TOKEN_EXPIRED", "Token หมดอายุ");
    }

    // Default: Internal Server Error
    return sendError(res, 500, "INTERNAL_ERROR", "เกิดข้อผิดพลาดภายในระบบ");
};

module.exports = errorHandler;
