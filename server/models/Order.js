const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  billingDetails: {
    fullName: String,
    email: String,
    phoneNumber: String,
    address: String
  },
  products: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED", "CANCELED"],
    default: "PENDING",
  },

}, {
  timestamps: true,
})

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
