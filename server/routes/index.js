const express = require('express');
const router = express.Router();

const authRoute = require('./auth');
const productRoute = require('./product');
const userRoute = require('./user');
const orderRoute = require('./order');
const chatroomRoute = require('./chat');
// const historyRoute = require('./histories');
const othersRoute = require('./others');


router.use('/auth', authRoute);
router.use('/products', productRoute);
router.use('/users', userRoute);
router.use('/orders', orderRoute);
router.use('/chat', chatroomRoute);
// router.use('/histories', historyRoute);
router.use('/', othersRoute);

module.exports = router;
