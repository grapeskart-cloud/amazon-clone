const mongoose = require("mongoose");

const sellerPerformanceSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
      unique: true,
    },

    totalOrders: { type: Number, default: 0 },
    completedOrders: { type: Number, default: 0 },
    cancelledOrders: { type: Number, default: 0 },

    totalRevenue: { type: Number, default: 0 },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    performanceScore: {
      type: Number,
      default: 0,
    },

    lastUpdatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SellerPerformance", sellerPerformanceSchema);
