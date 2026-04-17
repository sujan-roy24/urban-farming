const express = require("express");
const auth = require("../../middlewares/auth.middleware");
const productController = require("./product.controller");

const router = express.Router();

router.post("/", auth("VENDOR"), productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getSingleProduct);

module.exports = router;