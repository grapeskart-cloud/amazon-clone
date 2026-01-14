const express = require("express");
const router = express.Router();
const upload = require("../../middleware/admin/upload");
const controller = require("../../controller/admin/product.controller");

router.post("/", upload.array("images", 5), controller.createProduct);
router.get("/", controller.getAllProducts);
router.get("/:id", controller.getProductById);
router.put("/:id", upload.array("images", 5), controller.updateProduct);
router.patch("/:id/status", controller.updateProductStatus);
router.delete("/:id", controller.deleteProduct);

module.exports = router;
