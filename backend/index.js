require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import routers
const userRouter = require("./router/user.router");
const chatRouter = require("./router/chat.router");
const authRouter = require("./router/auth.router");
const homeRouter = require("./router/home.router");

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration - reads from env, supports multiple origins
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173")
      .split(",")
      .map((o) => o.trim());

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/home", homeRouter);
app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to T-Check API Backend",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      auth: "/api/auth",
      users: "/api/users",
      chats: "/api/chats",
    },
  });
});

// API documentation route
app.get("/api", (req, res) => {
  res.json({
    message: "T-Check API Documentation",
    endpoints: {
      auth: {
        "POST /api/auth/register": "Register new user (validation: username min 2, email format, password min 8)",
      },
      users: {
        "GET /api/users": "Get all users",
        "GET /api/users/:id": "Get user by ID",
        "POST /api/users/register": "Register new user (legacy)",
        "POST /api/users/login": "Login user",
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
    ok: false,
    error: {
      code: "NOT_FOUND",
      message: "Route not found",
    },
  });
});

// Central Error Handler (must be last)
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

// Connect to MongoDB and start server
const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📝 API Documentation: http://localhost:${PORT}/api`);
  });
};

startServer();
