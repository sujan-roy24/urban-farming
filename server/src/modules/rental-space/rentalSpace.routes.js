const express = require("express");
const auth = require("../../middlewares/auth.middleware");
const rentalSpaceController = require("./rentalSpace.controller");

const router = express.Router();

router.post("/", auth("VENDOR"), rentalSpaceController.createRentalSpace);
router.get("/", rentalSpaceController.getAllRentalSpaces);
router.get("/:id", rentalSpaceController.getSingleRentalSpace);

module.exports = router;