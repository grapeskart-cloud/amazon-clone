const express = require("express");
const router = express.Router();
const sellerController = require("../../controller/admin/seller.controller");

router.post("/", sellerController.createSeller);
router.get("/", sellerController.getSellers);
router.get("/:id", sellerController.getSellerById);
router.put("/:id", sellerController.updateSeller);
router.patch("/:id/status", sellerController.changeSellerStatus);
router.delete("/:id", sellerController.deleteSeller);

module.exports = router;
