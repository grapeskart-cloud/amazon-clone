const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
      enum: [
        "electronics",
        "fashion",
        "home",
        "books",
        "sports",
        "beauty",
        "other",
      ],
    },
    images: { type: [String], required: true },
    stock: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      enum: ["active", "inactive", "out_of_stock"],
      default: "active",
    },
    featured: { type: Boolean, default: false },
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
