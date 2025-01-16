const express = require('express');
const {getChatRooms} = require("../controllers/chat");
const router = express.Router();

router.get("/", getChatRooms);

module.exports = router;