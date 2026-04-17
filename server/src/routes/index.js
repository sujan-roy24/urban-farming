const express = require("express");
const prisma = require("../config/prisma");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Urban Farming API is running"
    });
});

router.get("/db-test", async (req, res) => {
    try {
        await prisma.$connect();

        res.json({
            success: true,
            message: "Database connected successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Database connection failed",
            error: error.message
        });
    }
});

module.exports = router;