const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder
} = require("../../controller/admin/order.controller");

router.post("/", createOrder);         
router.get("/", getOrders);              
router.put("/:id", updateOrderStatus);   
router.delete("/:id", deleteOrder);      

module.exports = router;
