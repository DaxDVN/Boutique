const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["customer", "consultant", "admin"],
    default: "customer"
  },
  sessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
    }
  ],
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      }
    },
  ],
}, {
  timestamps: true,
})

const User = mongoose.model("User", userSchema);
module.exports = User;