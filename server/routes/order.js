const express = require('express');
const {checkOut, getOrdersByUser, getOrder, getOrders } = require("../controllers/orders");
const router = express.Router();

router.get("/", getOrders)
router.get("/:id/orders", getOrdersByUser)
router.get("/:id", getOrder)
router.post("/:id/checkout", checkOut)

module.exports = router;