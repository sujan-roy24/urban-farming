const express = require("express");
const auth = require("../../middlewares/auth.middleware");
const orderController = require("./order.controller");

const router = express.Router();

router.post("/", auth("CUSTOMER"), orderController.createOrder);
router.get("/my-orders", auth("CUSTOMER"), orderController.getMyOrders);
router.get("/vendor-orders", auth("VENDOR"), orderController.getVendorOrders);

module.exports = router;