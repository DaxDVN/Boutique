const dotenv = require("dotenv");

dotenv.config();

const DB_URL = process.env.DB_URL;
const SECRET_KEY = process.env.SECRET_KEY;
const MAIL_KEY = process.env.SENDGRID_KEY;
const MAIL_FROM = process.env.EMAIL_FROM;
const PORT = process.env.PORT;
module.exports =
  {
    DB_URL, SECRET_KEY, MAIL_KEY, MAIL_FROM, PORT
  };