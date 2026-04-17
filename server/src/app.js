const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const indexRoutes = require("./routes");
const authRoutes = require("./modules/auth/auth.routes");
const vendorRoutes = require("./modules/vendor/vendor.routes");
const certificationRoutes = require("./modules/certification/certification.routes");
const productRoutes = require("./modules/product/product.routes");
const rentalSpaceRoutes = require("./modules/rental-space/rentalSpace.routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/", indexRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/certifications", certificationRoutes);
app.use("/api/products", productRoutes);
app.use("/api/rental-spaces", rentalSpaceRoutes);

module.exports = app;