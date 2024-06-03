const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getUserOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, admin } = require("../middlewares/authMiddleware");

router.route("/").post(protect, addOrderItems);

router.route("/myorders").get(protect, getUserOrders);

router.route("/:id").put(protect, admin, updateOrderStatus);

module.exports = router;
