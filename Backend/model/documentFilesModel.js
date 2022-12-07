import mongoose from "mongoose";

const DocumentFile = mongoose.Schema(
  {
    documentFileLname: {
      type: String,
      required: true,
    },
    fileLink: {
      type: String,
    },
  },
  { timestamps: true }
);
export const documentFile = mongoose.model("DocumentFile", DocumentFile);
