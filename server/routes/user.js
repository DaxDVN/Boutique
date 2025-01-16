const express = require('express');
const {saveCart, getUserById} = require("../controllers/users");
const router = express.Router();

router.get("/:id", getUserById)
router.put("/:id/cart", saveCart)

module.exports = router;