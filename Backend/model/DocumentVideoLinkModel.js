import mongoose from "mongoose";

const DocumentVideo = mongoose.Schema(
  {
    documentVLname: {
      type: String,
      required: true,
    },
    videoLink: {
      type: String,
    },
    userID: {
      type: String,
      required: true,
    },
    selectUser: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const documentVideo = mongoose.model("DocumentVideo", DocumentVideo);
