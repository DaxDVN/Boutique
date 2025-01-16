const express = require('express');
const {
  getStatistic
} = require("../controllers/others");

const router = express.Router()

router.get("/statistic", getStatistic);

module.exports = router