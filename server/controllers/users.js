const User = require("../models/User");

exports.saveCart = async (req, res) => {
  try {
    const cart = req.body.cart;
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(userId, {
      $set: {
        cart: cart,
      }
    }, {new: true})
    return res.status(200).json({user})
  } catch (error) {
    return res.status(500).json({error})
  }
}

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({_id: id}).select("fullName email phoneNumber")
    if (!user) {
      return res.status(404).json({message: "User not found"})
    }
    return res.status(200).json({user})
  } catch (error) {
    return res.status(500).json({error})
  }
}