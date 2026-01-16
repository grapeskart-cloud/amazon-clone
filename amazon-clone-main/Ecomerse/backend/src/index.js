const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

dotenv.config();
const connectDB = require("./config/db");
const productRoutes = require("./routes/admin/product.routes");
const adminSellerRoutes = require("./routes/admin/seller.routes");
const sellerPerformanceRoutes = require("./routes/admin/sellerPerformance.routes");
const categoryRoutes = require("./routes/admin/category.routes");
const pricingRuleRoutes = require("./routes/admin/pricingRule.routes");
const commissionRoutes = require("./routes/admin/commission.routes");
const contentmanagementRoutes = require("./routes/admin/cms.routes");
const orderRoutes = require("./routes/admin/order.routes");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const createUploadDirectories = () => {
  const directories = [
    path.join(__dirname, "uploads", "products"),
    path.join(__dirname, "uploads", "categories"),
    path.join(__dirname, "public", "uploads", "products"),
    path.join(__dirname, "public", "uploads", "categories"),
    path.join(__dirname, "uploads", "images"),
    path.join(__dirname, "uploads", "videos"),
    path.join(__dirname, "uploads", "documents"),
    path.join(__dirname, "uploads", "profiles"),
  ];

  directories.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Created directory: ${dir}`);
    }
  });
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
app.use("/api/categories", categoryRoutes);
app.use("/api/admin/pricing-rules", pricingRuleRoutes);
app.use("/api/admin/commissions", commissionRoutes);
app.use("/api/admin/cms", contentmanagementRoutes);
app.use("/api/admin/orders", orderRoutes);

app.get("/api/debug/uploads", (req, res) => {
  try {
    const uploadsPath = path.join(__dirname, "uploads", "products");
    const files = fs.readdirSync(uploadsPath);
    res.json({
      success: true,
      uploadsPath,
      files,
      accessibleUrl: "http://localhost:8000/uploads/products/",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      path: path.join(__dirname, "uploads", "products"),
    });
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    uploads: {
      srcUploads: fs.existsSync(path.join(__dirname, "uploads")),
      publicUploads: fs.existsSync(path.join(__dirname, "public", "uploads")),
    },
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
      console.log(
        `📂 Categories URL → http://localhost:${PORT}/api/categories`
      );
      console.log("=".repeat(50));
    });
  } catch (err) {
    console.error("❌ Server startup error:", err.message);
  }
};
startServer();

module.exports = app;
