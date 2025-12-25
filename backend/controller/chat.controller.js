const mockChats = require("../datamock/chats.mock");

// Store for mock data (simulating database)
let chats = [...mockChats];
let idCounter = chats.length + 1;

const ChatController = {
    // Get all chats
    getAllChats: (req, res) => {
        res.status(200).json({
            success: true,
            data: chats,
            message: "Chats retrieved successfully",
        });
    },

    // Get chat by ID
    getChatById: (req, res) => {
        const { id } = req.params;
        const chat = chats.find((c) => c.id === id);

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found",
            });
        }

        res.status(200).json({
            success: true,
            data: chat,
        });
    },

    // Get chats by user ID
    getChatsByUserId: (req, res) => {
        const { userId } = req.params;
        const userChats = chats.filter((c) => c.userId === userId);

        res.status(200).json({
            success: true,
            data: userChats,
            message: `Found ${userChats.length} chats for user ${userId}`,
        });
    },

    // Create new chat
    createChat: (req, res) => {
        try {
            const { inputText, outputText, mode_model, correct_version_text, userId } = req.body;

            if (!inputText || !outputText || !mode_model) {
                return res.status(400).json({
                    success: false,
                    message: "inputText, outputText, and mode_model are required",
                });
            }

            const newChat = {
                id: String(idCounter++),
                inputText,
                outputText,
                mode_model,
                correct_version_text: correct_version_text || null,
                userId: userId || null,
                createdAt: new Date().toISOString(),
            };

            chats.push(newChat);

            res.status(201).json({
                success: true,
                data: newChat,
                message: "Chat created successfully",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error creating chat",
                error: error.message,
            });
        }
    },

    // Update chat (mainly for correct_version_text)
    updateChat: (req, res) => {
        const { id } = req.params;
        const { inputText, outputText, mode_model, correct_version_text } = req.body;

        const chatIndex = chats.findIndex((c) => c.id === id);

        if (chatIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Chat not found",
            });
        }

        chats[chatIndex] = {
            ...chats[chatIndex],
            inputText: inputText || chats[chatIndex].inputText,
            outputText: outputText || chats[chatIndex].outputText,
            mode_model: mode_model || chats[chatIndex].mode_model,
            correct_version_text: correct_version_text !== undefined 
                ? correct_version_text 
                : chats[chatIndex].correct_version_text,
        };

        res.status(200).json({
            success: true,
            data: chats[chatIndex],
            message: "Chat updated successfully",
        });
    },

    // Delete chat
    deleteChat: (req, res) => {
        const { id } = req.params;
        const chatIndex = chats.findIndex((c) => c.id === id);

        if (chatIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Chat not found",
            });
        }

        chats.splice(chatIndex, 1);
        res.status(200).json({
            success: true,
            message: "Chat deleted successfully",
        });
    },

    // Get chats by mode_model
    getChatsByMode: (req, res) => {
        const { mode } = req.params;
        const modeChats = chats.filter((c) => c.mode_model === mode);

        res.status(200).json({
            success: true,
            data: modeChats,
            message: `Found ${modeChats.length} chats for mode ${mode}`,
        });
    },
};

module.exports = ChatController;
