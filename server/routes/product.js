const express = require("express");
const {
  getProducts, searchProducts, getProduct, postProduct, putProduct, deleteProduct
} = require("../controllers/products");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/", getProducts);
router.get("/pagination", searchProducts);
router.get("/:id", getProduct);
router.post("/", upload.array("images", 4), postProduct);
router.put("/:id", putProduct);
router.delete("/:id", deleteProduct);

module.exports = router;