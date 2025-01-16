const { Server } = require("socket.io");
let io;
const init = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true
    }
  });
  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("No such socket");
  }
  return io;
};

module.exports = {
  init, getIO
};