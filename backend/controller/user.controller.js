const User = require("../model/user.model");
const bcrypt = require("bcrypt");

const UserController = {
    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find().select("-passwordHash");
            res.status(200).json({
                success: true,
                data: users,
                message: "Users retrieved successfully",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error retrieving users",
                error: error.message,
            });
        }
    },

    // Get user by ID
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id).select("-passwordHash");

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            res.status(200).json({
                success: true,
                data: user,
            });
        } catch (error) {
            // Handle invalid ObjectId format
            if (error.name === "CastError") {
                return res.status(400).json({
                    success: false,
                    message: "Invalid user ID format",
                });
            }
            res.status(500).json({
                success: false,
                message: "Error retrieving user",
                error: error.message,
            });
        }
    },

    // Register new user
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            // Validate required fields
            if (!username || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Username, email, and password are required",
                });
            }

            // Hash password
            const passwordHash = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = await User.create({
                username,
                email,
                passwordHash,
            });

            // Return user without passwordHash
            const userResponse = {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                createdAt: newUser.createdAt,
            };

            res.status(201).json({
                success: true,
                data: userResponse,
                message: "User registered successfully",
            });
        } catch (error) {
            // Handle duplicate key error (E11000)
            if (error.code === 11000) {
                const field = Object.keys(error.keyPattern)[0];
                return res.status(409).json({
                    ok: false,
                    error: {
                        code: field === "email" ? "EMAIL_EXISTS" : "DUPLICATE_KEY",
                        message: field === "email" 
                            ? "อีเมลนี้ถูกใช้แล้ว" 
                            : `${field} นี้ถูกใช้แล้ว`,
                    },
                });
            }

            // Handle validation errors
            if (error.name === "ValidationError") {
                return res.status(400).json({
                    success: false,
                    message: "Validation error",
                    error: Object.values(error.errors).map((e) => e.message),
                });
            }

            res.status(500).json({
                success: false,
                message: "Error registering user",
                error: error.message,
            });
        }
    },

    // Login user
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Validate required fields
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Email and password are required",
                });
            }

            // Find user by email
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password",
                });
            }

            // Verify password
            const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password",
                });
            }

            // Return user without passwordHash
            // Note: JWT token generation will be added in Sprint 1
            const userResponse = {
                _id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
            };

            res.status(200).json({
                success: true,
                data: userResponse,
                message: "Login successful",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error logging in",
                error: error.message,
            });
        }
    },

    // Update user
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { username, email } = req.body;

            const user = await User.findByIdAndUpdate(
                id,
                { username, email },
                { new: true, runValidators: true }
            ).select("-passwordHash");

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            res.status(200).json({
                success: true,
                data: user,
                message: "User updated successfully",
            });
        } catch (error) {
            // Handle duplicate key error
            if (error.code === 11000) {
                return res.status(409).json({
                    ok: false,
                    error: {
                        code: "EMAIL_EXISTS",
                        message: "อีเมลนี้ถูกใช้แล้ว",
                    },
                });
            }

            if (error.name === "CastError") {
                return res.status(400).json({
                    success: false,
                    message: "Invalid user ID format",
                });
            }

            res.status(500).json({
                success: false,
                message: "Error updating user",
                error: error.message,
            });
        }
    },

    // Delete user
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByIdAndDelete(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            res.status(200).json({
                success: true,
                message: "User deleted successfully",
            });
        } catch (error) {
            if (error.name === "CastError") {
                return res.status(400).json({
                    success: false,
                    message: "Invalid user ID format",
                });
            }

            res.status(500).json({
                success: false,
                message: "Error deleting user",
                error: error.message,
            });
        }
    },
};

module.exports = UserController;
