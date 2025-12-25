require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import routers
const userRouter = require("./router/user.router");
const chatRouter = require("./router/chat.router");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);

// Health check route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Chat API Backend",
        version: "1.0.0",
        endpoints: {
            users: "/api/users",
            chats: "/api/chats",
        },
    });
});

// API documentation route
app.get("/api", (req, res) => {
    res.json({
        message: "Chat API Documentation",
        endpoints: {
            users: {
                "GET /api/users": "Get all users",
                "GET /api/users/:id": "Get user by ID",
                "POST /api/users/register": "Register new user",
                "POST /api/users/login": "Login user",
                "POST /api/users/logout/:id": "Logout user",
                "PUT /api/users/:id": "Update user",
                "DELETE /api/users/:id": "Delete user",
            },
            chats: {
                "GET /api/chats": "Get all chats",
                "GET /api/chats/:id": "Get chat by ID",
                "GET /api/chats/user/:userId": "Get chats by user ID",
                "GET /api/chats/mode/:mode": "Get chats by mode_model",
                "POST /api/chats": "Create new chat",
                "PUT /api/chats/:id": "Update chat",
                "DELETE /api/chats/:id": "Delete chat",
            },
        },
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message,
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📝 API Documentation: http://localhost:${PORT}/api`);
});
