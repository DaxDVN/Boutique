const express = require('express');
const http = require("http");
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");

const apiRoutes = require('./routes');
const chatHandler = require('./sockets/chatHandler');
const { DB_URL, PORT } = require("./utils/config");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);
app.use("/images", express.static(path.join(__dirname,"data", "images")));

app.use((req, res, next) =>
{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});



mongoose
  .connect(DB_URL)
  .then(() =>
  {
    const io = require('./sockets/index').init(server);
    io.on('connection', (socket) => {
      console.log("User connected:", socket.id);
      chatHandler(socket, io)
    })
    server.listen(PORT);
  })
  .catch((err) =>
  {
    console.log(err);
  })