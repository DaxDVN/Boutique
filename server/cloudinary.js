const { v2: cloudinary } = require("cloudinary");
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = require("./utils/config");

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

module.exports = cloudinary