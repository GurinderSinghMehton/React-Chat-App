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
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

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
