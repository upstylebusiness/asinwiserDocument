import asyncHandler from "express-async-handler";
import { documentVideo } from "../model/DocumentVideoLinkModel.js";
import { driveDocument } from "../model/driveDocument.js";

export const findLinkvideo = asyncHandler(async (req, res) => {
  const { id } = req.query;
  let findVideo = await documentVideo.find({
    $or: [{ selectUser: id }, { selectUser: "all" }],
  });
  res.json(findVideo);
});

// findLinkDocument
export const findLinkDocument = asyncHandler(async (req, res) => {
  const { id } = req.query;

  let findDocument = await driveDocument.find({
    $or: [{ selectUser: id }, { selectUser: "all" }],
  });
  console.log(findDocument, "sdfsdfsdfsdf");
  res.json(findDocument);
});
