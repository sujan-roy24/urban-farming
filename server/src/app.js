const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const indexRoutes = require("./routes");
const authRoutes = require("./modules/auth/auth.routes");
const vendorRoutes = require("./modules/vendor/vendor.routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/", indexRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/vendor", vendorRoutes);

module.exports = app;