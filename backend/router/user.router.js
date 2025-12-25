const express = require("express");
const router = express.Router();
const UserController = require("../controller/user.controller");

// Get all users
router.get("/", UserController.getAllUsers);

// Get user by ID
router.get("/:id", UserController.getUserById);

// Register new user
router.post("/register", UserController.register);

// Login user
router.post("/login", UserController.login);

// Logout user
router.post("/logout/:id", UserController.logout);

// Update user
router.put("/:id", UserController.updateUser);

// Delete user
router.delete("/:id", UserController.deleteUser);

module.exports = router;
