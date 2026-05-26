import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: false,
  },

  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Groups",
    default: null,
  },

  messageType: {
    type: String,
    enum: ["text", "file"],
    required: true,
  },
  content: {
    type: String,
    required: function () {
      return this.messageType === "text";
    },
  },
  fileUrl: {
    type: String,
    required: function () {
      return this.messageType === "file";
    },
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// ================= INDEXES =================

// unread message lookup
messageSchema.index({
  sender: 1,
  recipient: 1,
  isRead: 1,
});

// chat history sorting
messageSchema.index({
  sender: 1,
  recipient: 1,
  timestamp: -1,
});

// recent received messages
messageSchema.index({
  recipient: 1,
  timestamp: -1,
});

// ===========================================

messageSchema.pre("save", function (next) {
  if (!this.recipient && !this.groupId) {
    return next(new Error("Message must have recipient or groupId"));
  }

  if (this.recipient && this.groupId) {
    return next(new Error("Message cannot have both recipient and groupId"));
  }

  next();
});

const Message = mongoose.model("Messages", messageSchema);

export default Message;
