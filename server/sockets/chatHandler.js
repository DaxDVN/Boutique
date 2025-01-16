const Session = require("../models/Session");

module.exports = (socket, io) => {
  const adminRooms = new Set();
  socket.on("sendMessage", async ({ roomId, sender, content }) => {
    try {
      let session = await Session.findOne({ roomId: roomId });
      if (!session) {
        session = new Session({ roomId });
      }
      const message = {
        roomId: roomId,
        sender: sender?._id || roomId,
        content: content,
        senderRole: sender.role || "customer"
      };
      session.messages.push(message);
      await session.save();
      const sessions = await Session.find().sort({createdAt: -1})
      io.emit("roomUpdate", sessions);
      socket.broadcast.to(roomId).emit("receiveMessage", message);
    } catch (e) {
      console.error("Error sending message:", e);
    }
  });

  socket.on("joinRoom", async (roomId) => {
    socket.join(roomId);
    adminRooms.add(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
  })

  socket.on("leaveRoom", async (roomId) => {
    socket.leave(roomId);
    console.log(`User ${socket.id} left room: ${roomId}`);
    adminRooms.delete(roomId);
  });

  socket.on("endChat", async (roomId) => {
    try{
      await Session.updateOne({roomId}, {status: "inactive"});
      io.to(roomId).emit("chatEnded");
      const sessions = await Session.find().sort({createdAt: -1})
      io.emit("roomUpdate", sessions);
      console.log(`Room ${roomId} ended`)
    }catch(e){
      console.error("Error ending chat:", e);
    }
  })
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
};