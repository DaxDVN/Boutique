﻿const Products = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const mongoose = require("mongoose");
const path = require("path");

exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const products = await Products.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const totalCount = await Products.countDocuments();

    return res.status(200).json({
      result: products,
      totalCount,
      message: "Get products successfully"
    });
  } catch (error) {

    return res.status(500).json({
      message: "Unexpected error!"
    });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const keyword = req.query.keyword || "";
    const category = req.query.category || null;

    const filter = {};
    if (keyword) {
      filter.name = { $regex: keyword, $options: "i" };
    }
    if (category) {
      filter.category = category;
    }

    const skip = (page - 1) * limit;

    const products = await Products.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Products.countDocuments(filter);

    return res.status(200).json({
      result: products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      message: "Get products successfully"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unexpected error!"
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const products = await Products.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "category",
          foreignField: "category",
          as: "relationProduct"
        }
      },
      {
        $addFields: {
          relationProduct: { $slice: ["$relationProduct", 4] }
        }
      }
    ]);
    const product = products[0];
    if (!product) {
      return res.status(404).json({ message: "Products not found" });
    }

    return res.status(200).json({
      result: product,
      message: `Product with ID ${id}`
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unexpected error!"
    });
  }
};

exports.postProduct = async (req, res) => {
  const imagePaths = req.files.map(file => `/images/${file.filename}`);
  if (imagePaths.length < 4) {
    return res.status(400).json({ message: "Need 4 images" });
  }
  for (const value of Object.values(req.body)) {
    if (typeof value === "string" && value === "") {
      return res.status(400).json({ message: "Missing field" });
    }
  }
  try {
    const newProduct = new Products({
      category: req.body.category,
      name: req.body.name,
      price: req.body.price,
      long_desc: req.body.long_desc,
      short_desc: req.body.short_desc,
      img1: imagePaths[0],
      img2: imagePaths[1],
      img3: imagePaths[2],
      img4: imagePaths[3]
    });
    const result = await newProduct.save();
    return res.status(201).json({
      result: result,
      message: "Create product successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Unexpected error!"
    });
  }
};

exports.putProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const result = await Products.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );
    if (!result) {
      return res.status(404).json({ message: "Products not found" });
    }
    return res.status(200).json({
      result: result,
      message: "Edit product successfully"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unexpected error!"
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const usersWithProductInCart = await User.find({
      "cart._id": id
    });

    if (usersWithProductInCart.length > 0) {
      return res.status(400).json({
        message: "This product is in users' carts and cannot be deleted"
      });
    }

    const ordersWithProductInProgress = await Order.find({
      "products._id": id,
      status: "PENDING"
    });

    if (ordersWithProductInProgress.length > 0) {
      return res.status(400).json({
        message: "This product is in pending orders and cannot be deleted"
      });
    }
    const result = await Products.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      result: result,
      message: "Product deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unexpected error!"
    });
  }
};