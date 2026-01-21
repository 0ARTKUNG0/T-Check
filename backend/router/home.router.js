const express = require("express");
const router = express.Router();
const jwtAuth = require("../middleware/jwtAuth");
const HomeController = require("../controller/home.controller");

// Get home page data (protected)
// GET /api/home
router.get("/", jwtAuth, HomeController.getHome);

module.exports = router;
