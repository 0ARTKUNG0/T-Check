const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
            trim: true,
            minlength: [2, "Username must be at least 2 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
        },
        passwordHash: {
            type: String,
            required: [true, "Password is required"],
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt
        versionKey: false,
    }
);

// Create unique index for email
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
