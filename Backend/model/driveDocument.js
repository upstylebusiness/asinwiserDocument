import mongoose from "mongoose";

const DriveDocument = mongoose.Schema(
  {
    driveDocumentName: {
      type: String,
      required: true,
    },
    driveDocumentLink: {
      type: String,
      required: true,
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
export const driveDocument = mongoose.model("DriveDocument", DriveDocument);
