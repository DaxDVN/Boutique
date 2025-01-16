const express = require('express');
const { register, login } = require("../controllers/auth");
const User = require("../models/User")
const { body } = require("express-validator");

const router = express.Router();

router.post("/register", [
  body("email").trim().isEmail().notEmpty().custom(async (value) =>
  {
    const user = await User.findOne({ email: value })
    if (user) {
      return Promise.reject('Email address already exists!');
    }
  }),
  body("password").trim().isLength({ min: 8 }),
  body("fullName").trim().isLength({ min: 8 }),
  body("phone").trim().isLength({ min: 9 })
], register)

router.post("/login", [body("email").trim().isEmail().notEmpty().custom(async (value) =>
{
  const user = await User.findOne({ email: value })
  if (!user) {
    return Promise.reject('Email address not found!');
  }
}),
body("password").trim().isLength({ min: 8 })],
  login
)

module.exports = router;
