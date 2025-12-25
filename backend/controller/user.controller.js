const mockUsers = require("../datamock/users.mock");
const bcrypt = require("bcrypt");

// Store for mock data (simulating database)
let users = [...mockUsers];
let idCounter = users.length + 1;

const UserController = {
    // Get all users
    getAllUsers: (req, res) => {
        const usersWithoutPassword = users.map(({ password, ...user }) => user);
        res.status(200).json({
            success: true,
            data: usersWithoutPassword,
            message: "Users retrieved successfully",
        });
    },

    // Get user by ID
    getUserById: (req, res) => {
        const { id } = req.params;
        const user = users.find((u) => u.id === id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const { password, ...userWithoutPassword } = user;
        res.status(200).json({
            success: true,
            data: userWithoutPassword,
        });
    },

    // Register new user
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            // Check if user already exists
            const existingUser = users.find(
                (u) => u.email === email || u.username === username
            );

            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "User with this email or username already exists",
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = {
                id: String(idCounter++),
                username,
                email,
                password: hashedPassword,
                token: null,
            };

            users.push(newUser);

            const { password: _, ...userWithoutPassword } = newUser;
            res.status(201).json({
                success: true,
                data: userWithoutPassword,
                message: "User registered successfully",
            });
        } catch (error) {
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

            // Find user by email
            const user = users.find((u) => u.email === email);

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password",
                });
            }

            // For mock data, we'll just generate a token
            // In real app, you'd verify password with bcrypt.compare
            const token = `mock_token_${user.username}_${Date.now()}`;

            // Update user token
            user.token = token;

            const { password: _, ...userWithoutPassword } = user;
            res.status(200).json({
                success: true,
                data: {
                    ...userWithoutPassword,
                    token,
                },
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

    // Logout user
    logout: (req, res) => {
        const { id } = req.params;
        const user = users.find((u) => u.id === id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        user.token = null;
        res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    },

    // Update user
    updateUser: (req, res) => {
        const { id } = req.params;
        const { username, email } = req.body;

        const userIndex = users.findIndex((u) => u.id === id);

        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        users[userIndex] = {
            ...users[userIndex],
            username: username || users[userIndex].username,
            email: email || users[userIndex].email,
        };

        const { password, ...userWithoutPassword } = users[userIndex];
        res.status(200).json({
            success: true,
            data: userWithoutPassword,
            message: "User updated successfully",
        });
    },

    // Delete user
    deleteUser: (req, res) => {
        const { id } = req.params;
        const userIndex = users.findIndex((u) => u.id === id);

        if (userIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        users.splice(userIndex, 1);
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    },
};

module.exports = UserController;
