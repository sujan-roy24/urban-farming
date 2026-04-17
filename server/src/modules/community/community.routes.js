const express = require("express");
const auth = require("../../middlewares/auth.middleware");
const communityController = require("./community.controller");

const router = express.Router();

router.post("/", auth("ADMIN", "VENDOR", "CUSTOMER"), communityController.createPost);
router.get("/", communityController.getAllPosts);
router.get("/:id", communityController.getSinglePost);

module.exports = router;