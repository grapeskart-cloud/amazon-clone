const CMS = require("../../models/admin/cms.model");

exports.createContent = async (req, res) => {
  const data = await CMS.create(req.body);
  res.status(201).json({ success: true, data });
};

exports.getContents = async (req, res) => {
  const filter = {};
  if (req.query.type) {
    filter.type = req.query.type;
  }
  const data = await CMS.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, data });
};


exports.getBySlug = async (req, res) => {
  const data = await CMS.findOne({ slug: req.params.slug, status: "Published" });
  res.json({ success: true, data });
};

exports.updateContent = async (req, res) => {
  const data = await CMS.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, data });
};

exports.deleteContent = async (req, res) => {
  await CMS.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
