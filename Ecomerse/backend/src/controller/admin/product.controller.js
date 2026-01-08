const Product = require("../../models/admin/Product.model");

exports.createProduct = async (req, res) => {
  try {
    const images =
      req.files?.map((f) => `/uploads/products/${f.filename}`) || [];

    if (images.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "At least one image is required" });
    }

    const product = await Product.create({
      ...req.body,
      images,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      search,
      status,
      featured,
      minPrice,
      maxPrice,
    } = req.query;

    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (featured) filter.featured = featured === "true";

    if (search) {
      filter.$or = [
        { name: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
        { tags: new RegExp(search, "i") },
      ];
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: products,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });

  res.json({ success: true, data: product });
};

exports.updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.files?.length) {
      updateData.$push = {
        images: {
          $each: req.files.map((f) => `/uploads/products/${f.filename}`),
        },
      };
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    res.json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product)
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });

  res.json({ success: true, message: "Product deleted" });
};

exports.updateProductStatus = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  if (!product)
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });

  res.json({ success: true, data: product });
};
