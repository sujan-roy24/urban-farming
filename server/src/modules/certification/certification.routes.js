const express = require("express");
const auth = require("../../middlewares/auth.middleware");
const certificationController = require("./certification.controller");

const router = express.Router();

router.post("/", auth("VENDOR"), certificationController.submitCertification);
router.get("/me", auth("VENDOR"), certificationController.getMyCertifications);

module.exports = router;