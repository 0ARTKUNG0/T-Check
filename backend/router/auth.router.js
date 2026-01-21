const express = require("express");
const router = express.Router();
const AuthController = require("../controller/auth.controller");

// Register new user
// POST /api/auth/register
router.post("/register", AuthController.register);

module.exports = router;
