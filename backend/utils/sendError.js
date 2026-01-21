/**
 * Standard error response helper
 * @param {object} res - Express response object
 * @param {number} status - HTTP status code
 * @param {string} code - Error code (e.g., "VALIDATION_ERROR")
 * @param {string} message - Human-readable message
 * @param {object} details - Optional additional details
 */
const sendError = (res, status, code, message, details = null) => {
    return res.status(status).json({
        ok: false,
        error: {
            code,
            message,
            ...(details ? { details } : {}),
        },
    });
};

module.exports = sendError;
