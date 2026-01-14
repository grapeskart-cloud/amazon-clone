const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/sellerPerformance.controller");

router.post("/", controller.createPerformance);
router.get("/:sellerId", controller.getPerformanceBySeller);
router.put("/:sellerId", controller.updatePerformance);

module.exports = router;
