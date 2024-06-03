const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderItems: [orderItemSchema],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: ["placed", "shipped", "out for delivery", "delivered", "canceled"],
    default: "placed",
  },
  placedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
