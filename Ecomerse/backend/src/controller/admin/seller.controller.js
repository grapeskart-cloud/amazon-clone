const Seller = require("../../models/admin/Seller.model");

const mongoose = require("mongoose");
exports.createSeller = async (req, res) => {
  try {
    const seller = await Seller.create(req.body);
    res.status(201).json(seller);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getSellers = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;

    const query = { isActive: true };

    if (status) query.status = status;

    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
      ];
    }

    const sellers = await Seller.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Seller.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      limit: Number(limit),
      data: sellers,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSellerById = async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) return res.status(404).json({ message: "Seller not found" });
    res.json(seller);
  } catch {
    res.status(400).json({ message: "Invalid seller ID" });
  }
};

exports.updateSeller = async (req, res) => {
  try {
    const seller = await Seller.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!seller) return res.status(404).json({ message: "Seller not found" });
    res.json(seller);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.changeSellerStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowed = ["pending", "active", "suspended", "blocked", "archived"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const seller = await Seller.findById(req.params.id);
    if (!seller) return res.status(404).json({ message: "Seller not found" });

    seller.status = status;

    if (status === "archived") {
      seller.isActive = false;
      seller.archivedAt = new Date();
    }

    await seller.save();
    res.json(seller);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.deleteSeller = async (req, res) => {
  try {
    const id = req.params.id.trim();
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid seller ID" });
    }

    const seller = await Seller.findByIdAndDelete(id);

    if (!seller) return res.status(404).json({ message: "Seller not found" });

    res.json({ message: "Seller deleted successfully", seller });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
