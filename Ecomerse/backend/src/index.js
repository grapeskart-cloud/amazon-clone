const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");

dotenv.config();
const connectDB = require("./config/db");

const productRoutes = require("./routes/admin/product.routes");
const adminSellerRoutes = require("./routes/admin/seller.routes");
const sellerPerformanceRoutes = require("./routes/admin/sellerPerformance.routes");
const categoryRoutes = require("./routes/admin/category.routes");

const app = express();
const PORT = process.env.PORT || 8000;

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

const createUploadDirectories = () => {
  const baseDir = path.join(__dirname, "public", "uploads");
  const directories = [
    baseDir,
    path.join(baseDir, "products"),
    path.join(baseDir, "images"),
    path.join(baseDir, "videos"),
    path.join(baseDir, "documents"),
    path.join(baseDir, "profiles"),
  ];

  directories.forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  return baseDir;
};
createUploadDirectories();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);
app.use(morgan("dev"));

app.use("/api/products", productRoutes);
app.use("/api/admin/sellers", adminSellerRoutes);
app.use("/api/admin/seller-performance", sellerPerformanceRoutes);
app.use("/api/admin/categories", categoryRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("=".repeat(50));
      console.log(`🚀 Admin Server running on http://localhost:${PORT}`);
      console.log(`📂 Images URL → http://localhost:${PORT}/uploads/products/`);
      console.log("=".repeat(50));
    });
  } catch (err) {
    console.error("❌ Server startup error:", err.message);
  }
};
startServer();

module.exports = app;
