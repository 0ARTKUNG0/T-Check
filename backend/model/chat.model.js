const mongoose = require("mongoose");

const changeSchema = new mongoose.Schema(
    {
        from: {
            type: String,
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
        reason_th: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            default: 1,
        },
    },
    { _id: false }
);

const outputTextSchema = new mongoose.Schema(
    {
        corrected_text: {
            type: String,
            required: true,
        },
        changes: {
            type: [changeSchema],
            default: [],
        },
    },
    { _id: false }
);

const chatSchema = new mongoose.Schema(
    {
        inputText: {
            type: String,
            required: true,
        },
        outputText: {
            type: outputTextSchema,
            required: true,
        },
        mode_model: {
            type: String,
            required: true,
            enum: ["grammar_correction", "formal_correction", "spelling_check"],
        },
        correct_version_text: {
            type: String,
            default: null,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
