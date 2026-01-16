const Commission = require('../../models/admin/commission.model');

exports.createCommission = async (req, res) => {
  try {
    const commission = await Commission.create(req.body);
    res.status(201).json({ success: true, data: commission });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCommissions = async (req, res) => {
  try {
    const commissions = await Commission.find();
    res.json({ success: true, data: commissions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.updateCommission = async (req, res) => {
  try {
    const commission = await Commission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, data: commission });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.deleteCommission = async (req, res) => {
  try {
    await Commission.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Commission deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.getDescription = async (req, res) => {
    try {
        const commission = await Commission.findById(req.params.id);
        res.json({ success: true, data: commission });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}