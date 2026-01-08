const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },

    status: {
      type: String,
      enum: [
        "created",
        "pending",
        "active",
        "suspended",
        "blocked",
        "archived",
      ],
      default: "created",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    archivedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seller", sellerSchema);
