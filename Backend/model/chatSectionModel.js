import mongoose from "mongoose";

const ChatSchema = mongoose.Schema(
  {
    adminId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      unique: true,
    },
    message: [Object],
    time: {
      type: String,
      required: true,
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

  },
  { timestamps: true }
);
export const Chat = mongoose.model("Chat", ChatSchema);
