const Seller = require("../../models/admin/Seller.model");
const SellerPerformance = require("../../models/admin/SellerPerformance.model");
const mongoose = require("mongoose");

/**
 * Create performance record (once per seller)
 */
exports.createPerformance = async (req, res) => {
  try {
    const { sellerId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(400).json({ message: "Invalid seller ID" });
    }

    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const exists = await SellerPerformance.findOne({ seller: sellerId });
    if (exists) {
      return res.status(400).json({ message: "Performance already exists" });
    }

    const performance = await SellerPerformance.create({
      seller: sellerId,
    });

    res.status(201).json(performance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get performance by seller ID
 */
exports.getPerformanceBySeller = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const performance = await SellerPerformance.findOne({
      seller: sellerId,
    }).populate("seller", "name email status");

    if (!performance) {
      return res.status(404).json({ message: "Performance not found" });
    }

    res.json(performance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Update performance (admin / system)
 */
exports.updatePerformance = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const performance = await SellerPerformance.findOneAndUpdate(
      { seller: sellerId },
      {
        ...req.body,
        lastUpdatedAt: new Date(),
      },
      { new: true }
    );

    if (!performance) {
      return res.status(404).json({ message: "Performance not found" });
    }

    res.json(performance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
