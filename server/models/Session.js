const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true
  },
  messages: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      senderRole: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ],
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: 'active'
  }
}, {
  timestamps: true,
})

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;