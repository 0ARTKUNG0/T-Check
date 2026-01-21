const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    /**
     * Login user
     * POST /api/auth/login
     * Body: { usernameOrEmail, password } or { email, password } or { username, password }
     */
    login: async (req, res) => {
        try {
            const { usernameOrEmail, email, username, password } = req.body;

            // (3.1) Get identifier (priority: usernameOrEmail > email > username)
            const identifier = usernameOrEmail || email || username;

            // Validation
            if (!identifier || typeof identifier !== "string" || !identifier.trim()) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        code: "VALIDATION_ERROR",
                        message: "ข้อมูลไม่ถูกต้อง",
                        fields: { identifier: "Username or email is required" },
                    },
                });
            }

            if (!password || typeof password !== "string") {
                return res.status(400).json({
                    ok: false,
                    error: {
                        code: "VALIDATION_ERROR",
                        message: "ข้อมูลไม่ถูกต้อง",
                        fields: { password: "Password is required" },
                    },
                });
            }

            // (3.2) Normalize
            const trimmedIdentifier = identifier.trim();
            const identifierLower = trimmedIdentifier.toLowerCase();
            const isEmail = emailRegex.test(trimmedIdentifier);

            // (3.3) Find user
            let user;
            if (isEmail) {
                user = await User.findOne({ email: identifierLower });
            } else {
                // Search by username or email
                user = await User.findOne({
                    $or: [
                        { username: trimmedIdentifier },
                        { email: identifierLower }
                    ]
                });
            }

            // (3.4) Verify password
            if (!user) {
                return res.status(401).json({
                    ok: false,
                    error: {
                        code: "INVALID_CREDENTIALS",
                        message: "อีเมล/ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
                    },
                });
            }

            const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
            if (!isPasswordValid) {
                return res.status(401).json({
                    ok: false,
                    error: {
                        code: "INVALID_CREDENTIALS",
                        message: "อีเมล/ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
                    },
                });
            }

            // (3.5) Issue JWT
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                console.error("JWT_SECRET is not defined");
                return res.status(500).json({
                    success: false,
                    message: "Server configuration error: JWT_SECRET not defined",
                });
            }

            const token = jwt.sign(
                {
                    sub: user._id.toString(),
                    email: user.email,
                    username: user.username,
                },
                jwtSecret,
                { expiresIn: "1h" }
            );

            // Return 200 with token and user (no passwordHash)
            return res.status(200).json({
                success: true,
                data: {
                    token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        createdAt: user.createdAt,
                    },
                },
                message: "Login successful",
            });
        } catch (error) {
            // (3.6) Error handling
            console.error("Login error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    },

    /**
     * Get current user from DB
     * GET /api/auth/me
     * Requires: jwtAuth middleware
     */
    getMe: async (req, res) => {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({
                    ok: false,
                    error: {
                        code: "UNAUTHORIZED",
                        message: "ไม่พบข้อมูลผู้ใช้",
                    },
                });
            }

            // Query user from DB (exclude passwordHash)
            const user = await User.findById(userId).select("_id username email createdAt");

            if (!user) {
                return res.status(404).json({
                    ok: false,
                    error: {
                        code: "USER_NOT_FOUND",
                        message: "ไม่พบผู้ใช้",
                    },
                });
            }

            return res.status(200).json({
                success: true,
                data: {
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        createdAt: user.createdAt,
                    },
                },
            });
        } catch (error) {
            console.error("GetMe error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    },
};

module.exports = AuthController;
