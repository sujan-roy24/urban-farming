const express = require("express");
const auth = require("../../middlewares/auth.middleware");
const vendorController = require("./vendor.controller");

const router = express.Router();

router.post("/profile", auth("VENDOR"), vendorController.createVendorProfile);
router.get("/profile/me", auth("VENDOR"), vendorController.getMyVendorProfile);

module.exports = router;