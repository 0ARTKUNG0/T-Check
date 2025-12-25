const express = require("express");
const router = express.Router();
const ChatController = require("../controller/chat.controller");

// Get all chats
router.get("/", ChatController.getAllChats);

// Get chat by ID
router.get("/:id", ChatController.getChatById);

// Get chats by user ID
router.get("/user/:userId", ChatController.getChatsByUserId);

// Get chats by mode_model
router.get("/mode/:mode", ChatController.getChatsByMode);

// Create new chat
router.post("/", ChatController.createChat);

// Update chat
router.put("/:id", ChatController.updateChat);

// Delete chat
router.delete("/:id", ChatController.deleteChat);

module.exports = router;