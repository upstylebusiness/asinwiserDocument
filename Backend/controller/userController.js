import asyncHandler from "express-async-handler";
import { documentVideo } from "../model/DocumentVideoLinkModel.js";
import { driveDocument } from "../model/driveDocument.js";
import { Chat } from "../model/chatSectionModel.js";
import { User } from "../model/userRegisterModel.js";

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
  res.json(findDocument);
});

// userChatFind
export const userChatFind = asyncHandler(async (req, res) => {
  const { id } = req.query;

  let findDocument = await Chat.findOne({ userId: id });
  res.json(findDocument);
});

// userChatSubmit
export const userChatSubmit = asyncHandler(async (req, res) => {
  const { value, userID } = req.body;

  var currentTime = new Date();

  var currentOffset = currentTime.getTimezoneOffset();

  var ISTOffset = 330; // IST offset UTC +5:30

  var ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );

  // ISTTime now represents the time in IST coordinates

  var hoursIST = ISTTime.getHours();
  var minutesIST = ISTTime.getMinutes();

  let findAdmin = await User.findOne({ userId: userID });

  let findChatUser = await Chat.findOne({ userId: userID });

  if (findChatUser && findChatUser !== null) {
    let updateChatUser = await Chat.updateOne(
      { userId: userID },
      {
        $push: {
          message: {
            textChat: value,
            time: hoursIST + ":" + minutesIST,
            messageOwner: "user",
          },
        },
      }
    );
    res.json(updateChatUser);
  } else {
    let creatUserChat = await Chat.create({
      adminId: findAdmin.myAdmin,
      userId: userID,
      message: [
        {
          textChat: value,
          time: hoursIST + ":" + minutesIST,
          messageOwner: "user",
        },
      ],
      time: `${hoursIST + ":" + minutesIST}`,
    });
    console.log(creatUserChat, "value, userIDvalue, userIDvalue, userID");

    res.json(creatUserChat);
  }
});
