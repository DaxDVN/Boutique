const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwtHelper");
const { validationResult } = require("express-validator");

exports.register = async (req, res) =>
{
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = new User({
    email: req.body.email,
    password: hashedPassword,
    fullName: req.body.fullName,
    phoneNumber: req.body.phone,
  })

  const result = await newUser.save()

  return res.status(200).json({
    result: result,
    message: 'Register Successfully!'
  });
}

exports.login = async (req, res) =>
{
 try {

   const errors = validationResult(req)
   if (!errors.isEmpty()) {
     return res.status(400).json(errors)
   }

   const user = await User.findOne({ email: req.body.email })
   if (!user) {
     return res.status(400).json({ message: "Invalid email or password" });
   }

   const isMatch = await bcrypt.compare(req.body.password, user.password);

   if (!isMatch) {
     return res.status(400).json({ message: "Invalid password" });
   }
   const token = await generateToken(user);
   return res.status(200).json({
     result: {
       token: token,
       _id: user._id,
       email: user.email,
       fullName: user.fullName,
       cart: user.cart,
       role: user.role
     },
     message: 'Login Successfully!'
   });
 }
 catch (error){
   console.log(error);
 }
}