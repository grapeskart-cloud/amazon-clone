const Category = require("../../models/admin/category.model");
const slugify = require("slugify");

exports.createCategory = async (req, res) => {
  try {
    const { name, description, status, parentCategory, isFeatured } = req.body;

    const exists = await Category.findOne({ name });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Category with this name already exists",
      });
    }

    const slug = slugify(name, { lower: true, strict: true });

    const categoryData = {
      name,
      slug,
      description,
      status: status || "active",
      parentCategory: parentCategory || null,
      isFeatured: isFeatured || false,
    };

    if (req.file) {
      categoryData.image = `/uploads/categories/${req.file.filename}`;
    }

    const category = await Category.create(categoryData);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (err) {
    console.error("Create category error:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Failed to create category",
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const { status, featured, search } = req.query;

    let query = {};

    if (status) {
      query.status = status;
    }

    if (featured !== undefined) {
      query.isFeatured = featured === "true";
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const categories = await Category.find(query)
      .populate("parentCategory", "name slug")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (err) {
    console.error("Get categories error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "parentCategory",
      "name slug"
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (err) {
    console.error("Get category by ID error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch category",
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, description, status, parentCategory, isFeatured } = req.body;
    const updateData = {};

    if (name) {
      updateData.name = name;
      updateData.slug = slugify(name, { lower: true, strict: true });
    }
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (parentCategory !== undefined)
      updateData.parentCategory = parentCategory;
    if (isFeatured !== undefined) updateData.isFeatured = isFeatured;

    if (req.file) {
      updateData.image = `/uploads/categories/${req.file.filename}`;
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (err) {
    console.error("Update category error:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Failed to update category",
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check if category has child categories
    const childCategories = await Category.find({
      parentCategory: req.params.id,
    });
    if (childCategories.length > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete category with child categories. Please delete or reassign child categories first.",
      });
    }

    await category.deleteOne();

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    console.error("Delete category error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete category",
    });
  }
};

exports.getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug }).populate(
      "parentCategory",
      "name slug"
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (err) {
    console.error("Get category by slug error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch category",
    });
  }
};
