const User = require("../model/user.model");
const bcrypt = require("bcrypt");

// Email validation regex (simple for MVP)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AuthController = {
    /**
     * Register new user
     * POST /api/auth/register
     * Body: { username, email, password }
     */
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            // (2.1) Validation
            const errors = {};

            // Check required fields and types
            if (!username || typeof username !== "string") {
                errors.username = "Username is required";
            } else if (username.trim().length < 2) {
                errors.username = "Username must be at least 2 characters";
            }

            if (!email || typeof email !== "string") {
                errors.email = "Email is required";
            } else if (!emailRegex.test(email.trim())) {
                errors.email = "Invalid email format";
            }

            if (!password || typeof password !== "string") {
                errors.password = "Password is required";
            } else if (password.length < 8) {
                errors.password = "Password must be at least 8 characters";
            }

            // Return 400 if validation fails
            if (Object.keys(errors).length > 0) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        code: "VALIDATION_ERROR",
                        message: "ข้อมูลไม่ถูกต้อง",
                        fields: errors,
                    },
                });
            }

            // (2.2) Normalize input
            const normalizedUsername = username.trim();
            const normalizedEmail = email.trim().toLowerCase();

            // (2.3) Check duplicate email
            const existingUser = await User.findOne({ email: normalizedEmail });
            if (existingUser) {
                return res.status(409).json({
                    ok: false,
                    error: {
                        code: "EMAIL_EXISTS",
                        message: "อีเมลนี้ถูกใช้แล้ว",
                    },
                });
            }

            // (2.4) Hash password and create user
            const passwordHash = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                username: normalizedUsername,
                email: normalizedEmail,
                passwordHash,
            });

            // Return 201 without passwordHash
            return res.status(201).json({
                success: true,
                data: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    createdAt: newUser.createdAt,
                },
                message: "User registered successfully",
            });
        } catch (error) {
            // (2.5) Handle MongoDB duplicate key error
            if (error.code === 11000) {
                return res.status(409).json({
                    ok: false,
                    error: {
                        code: "EMAIL_EXISTS",
                        message: "อีเมลนี้ถูกใช้แล้ว",
                    },
                });
            }

            // Handle validation errors from Mongoose
            if (error.name === "ValidationError") {
                return res.status(400).json({
                    ok: false,
                    error: {
                        code: "VALIDATION_ERROR",
                        message: "ข้อมูลไม่ถูกต้อง",
                        fields: Object.fromEntries(
                            Object.entries(error.errors).map(([key, val]) => [key, val.message])
                        ),
                    },
                });
            }

            // Other errors
            console.error("Register error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    },
};

module.exports = AuthController;
