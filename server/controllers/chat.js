const Session = require("../models/Session");

exports.getChatRooms = async (req, res) => {
  try {
    const chatRooms = await Session.find().sort({createdAt: -1})
    return res.status(200).json({result: chatRooms})
  } catch (error) {
    return res.status(500).json({error})
  }
}
