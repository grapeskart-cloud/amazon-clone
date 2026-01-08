const express = require("express");
const router = express.Router();
const upload = require("../../middleware/admin/categoryUpload");

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
} = require("../../controller/admin/category.Controller");

router.post("/", upload.single("image"), createCategory);

router.get("/", getAllCategories);
router.get("/slug/:slug", getCategoryBySlug);
router.get("/:id", getCategoryById);

router.put("/:id", upload.single("image"), updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;
