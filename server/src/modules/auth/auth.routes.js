const express = require("express");
const authController = require("./auth.controller");
const { authRateLimiter } = require("../../middlewares/rateLimit.middleware");

const router = express.Router();

router.post("/register", authRateLimiter, authController.register);
router.post("/login", authRateLimiter, authController.login);

module.exports = router;