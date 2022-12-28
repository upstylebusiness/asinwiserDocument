import asyncHandler from "express-async-handler";
import AWS from "aws-sdk";
import Stripe from "stripe";
import { v4 } from "uuid";
const stripe = new Stripe(
  "sk_test_51LISYcIY8P5aqPzxj0pan32Ns74f2Mepr1X5ztnLTCIzGSfLI1NSZ2aTdBGI1FKi7TgS9KCSQKPWgH6WEcGuFWNU00cb4q1ftp"
);

import { Admin } from "../model/adminRegisterModel.js";
import { documentVideo } from "../model/DocumentVideoLinkModel.js";
import { documentFile } from "../model/documentFilesModel.js";

import { User } from "../model/userRegisterModel.js";

import generatorToken from "../util/jwtTokenGenerate.js";
import { uploadImages } from "./aws/s3Manage.js";
import { driveDocument } from "../model/driveDocument.js";
import { Chat } from "../model/chatSectionModel.js";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

export const registerAdmin = asyncHandler(async (req, res) => {
  const { fName, lName, email, password } = req.body;
  let findAdmin = await Admin.findOne({ email });
  if (!findAdmin) {
    let isUserExist = await Admin.create({
      firstName: fName,
      lastName: lName,
      email,
      password,
      isAdmin: true,
      isSuperAdmin: false,
      img: "",
    });

    res.json({
      isUserExist: {
        _id: isUserExist._id,
        name: isUserExist.firstName ? isUserExist.firstName : isUserExist.name,
        isSuperAdmin: isUserExist.isSuperAdmin,
        isAdmin: isUserExist.isAdmin,
      },
      Token: generatorToken(isUserExist),
    });
  } else {
    res.status(401);
    throw new Error("Already exist");
  }
});

export const LoginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  let isUserExist = await Admin.findOne({ email, password, isAdmin: true });
  if (isUserExist) {
    res.json({
      isUserExist: {
        _id: isUserExist._id,
        name: isUserExist.firstName ? isUserExist.firstName : isUserExist.name,
        isSuperAdmin: isUserExist.isSuperAdmin,
        isAdmin: isUserExist.isAdmin,
      },
      Token: generatorToken(isUserExist),
    });
  } else {
    let isUserExist = await User.findOne({ email, password });
    if (isUserExist) {
      res.json({
        isUserExist: {
          _id: isUserExist._id,
          name: isUserExist.firstName
            ? isUserExist.firstName
            : isUserExist.name,
          isSuperAdmin: isUserExist.isSuperAdmin,
          isAdmin: isUserExist.isAdmin,
        },
        Token: generatorToken(isUserExist),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Password or Email");
    }
  }
});

export const userRegister = asyncHandler(async (req, res) => {
  const { name, email, password, phone, userID } = req.body;
  let Check = await User.findOne({ email, myAdmin: userID });
  if (!Check && Check == null) {
    let isUserExist = await User.create({
      name,
      email,
      password,
      phone,
      status: "Active",
      rate: 2.5,
      myAdmin: userID,
      isBlock: false,
      isAdmin: false,
      isSuperAdmin: false,
      image: "",
    });
    res.json(isUserExist);
  } else {
    res.status(401);
    throw new Error("This User Already Registered");
  }
});

export const userFind = asyncHandler(async (req, res) => {
  const admin = req.query.id;
  let userConfirm = await User.find({ myAdmin: admin });

  res.json(userConfirm);
});

export const documentUpload = asyncHandler(async (req, res) => {
  const { Dname, Dlink } = req.body.details;
  const { userID, selectUser } = req.body;
  let Check = await documentVideo.findOne({
    documentVLname: Dname,
    videoLink: Dlink,
    userID,
    selectUser,
  });
  if (!Check && Check == null) {
    let isDocumentExist = await documentVideo.create({
      documentVLname: Dname,
      videoLink: Dlink,
      userID,
      selectUser,
    });
    res.json(isDocumentExist);
  } else {
    res.status(401);
    throw new Error("This Document Already Exist");
  }
});

export const driveDocumentUpload = asyncHandler(async (req, res) => {
  const { dDname, dDlink } = req.body.details;
  const { userID, selectUser } = req.body;
  let Check = await driveDocument.findOne({
    driveDocumentName: dDname,
    driveDocumentLink: dDlink,
    userID,
    selectUser,
  });
  if (!Check && Check == null) {
    let isDocumentExist = await driveDocument.create({
      driveDocumentName: dDname,
      driveDocumentLink: dDlink,
      userID,
      selectUser,
    });
    res.json(isDocumentExist);
  } else {
    res.status(401);
    throw new Error("This Document Already Exist");
  }
});

export const documentFind = asyncHandler(async (req, res) => {
  const { id } = req.query;
  let userConfirm = await documentVideo.find({ userID: id });
  res.json(userConfirm);
});

export const driveDocumentFind = asyncHandler(async (req, res) => {
  const { id } = req.query;
  let findConfirm = await driveDocument.find({ userID: id });
  res.json(findConfirm);
});

export const documentFileAdd = asyncHandler(async (req, res) => {
  uploadImages(req.body.docFile, "word_file");
  // let params1 = {
  //   Bucket: process.env.AWS_BUCKET_NAME,
  //   Key: id + "",
  //   Body: Image1.data,
  // };

  // let uplodConfirm = await documentFile.create({ documentFileLname, fileLink });
  // res.json(uplodConfirm);
});

// checkout
export const checkout = asyncHandler(async (req, res) => {
  try {
    const { token, reciveMoney } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    var uuid = v4;
    const idempotencyKey = uuid();
    const charge = await stripe.charges.create(
      {
        amount: reciveMoney,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Booked the upstylegroup`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,

            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotencyKey,
      }
    );
    //   const newTicket = await db.get(
    //     "INSERT INTO tripdetails(bus_id,user_id,contact_email,contact_mobile,arrivdate,depdate,dep_place,arr_place,tripStataus,total,booking_date,owner_id,status) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *",
    //     [
    //       bookInfo.id,
    //       bookInfo.userInfo.id,
    //       bookInfo.userContact.email,
    //       bookInfo.userContact.mobile,
    //       bookInfo.arraivaltime,
    //       bookInfo.departuretime,
    //       bookInfo.fromstart,
    //       bookInfo.toend,
    //       "Parking",
    //       bookInfo.prize,
    //       bookInfo.baseDate,
    //       bookInfo.owner_id,
    //       1
    //     ]
    //   );

    //   await bookInfo.TicketsInfo.map((passanger) => {
    //     db.get(
    //       "INSERT INTO passangers(trip_id , passanger_seat , passanger_name , passanger_age,passanger_gender,bus_id,trip_date,mobile,email,owner_id,total,status) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
    //       [
    //         newTicket.rows[0].tripid,
    //         passanger.seatNo,
    //         passanger.Name,
    //         passanger.Age,
    //         passanger.gender,
    //         bookInfo.id,
    //         bookInfo.departuretime,
    //         bookInfo.userContact.mobile,
    //         bookInfo.userContact.email,
    //         bookInfo.owner_id,
    //         bookInfo.prize,
    //         1
    //       ]
    //     );
    //   })

    //   status = "success";
  } catch (error) {
    //   status = "failure";
  }

  // res.json({ error, status });
});

// documentVidDel
export const documentVidDel = asyncHandler(async (req, res) => {
  const { id } = req.query;
  let deleteDocument = await documentVideo.deleteOne({
    _id: id,
  });
  res.json(deleteDocument);
});

// deleteDriveDocu
export const deleteDriveDocu = asyncHandler(async (req, res) => {
  const { id } = req.query;
  let deleteDocument = await driveDocument.deleteOne({
    _id: id,
  });
  res.json(deleteDocument);
});

// AdminFind
export const AdminFind = asyncHandler(async (req, res) => {
  const { id } = req.query;

  let findAdmin = await Admin.findOne({
    _id: id,
  });
  res.json(findAdmin);
});

// searchForMessage
export const searchForMessage = asyncHandler(async (req, res) => {
  const { value, userID } = req.body;
  let findUsers;
  if (value) {
    findUsers = await User.find({
      name: { $regex: value },
      myAdmin: { $regex: userID },
    });
  }
  res.json(findUsers);
});

// chatStarClickt
export const chatStarClick = asyncHandler(async (req, res) => {
  const { id, userID } = req.body;

  let findChat = await Chat.find({ adminId: userID, userId: id });

  if (findChat && findChat.length !== 0) {
    res.json(findChat);
  } else {
    var currentTime = new Date();

    var currentOffset = currentTime.getTimezoneOffset();

    var ISTOffset = 330; // IST offset UTC +5:30

    var ISTTime = new Date(
      currentTime.getTime() + (ISTOffset + currentOffset) * 60000
    );

    // ISTTime now represents the time in IST coordinates

    var hoursIST = ISTTime.getHours();
    var minutesIST = ISTTime.getMinutes();

    let creatChat = await Chat.create({
      adminId: userID,
      userId: id,
      message: [],
      time: `${hoursIST + ":" + minutesIST}`,
    });

    let createFind = await Chat.find({
      adminId: creatChat.adminId,
      userId: creatChat.userId,
    });
    console.log(createFind, "createFindcreateFindcreateFind");
    res.json(createFind);
  }
});

// submitNewMessage
export const submitNewMessage = asyncHandler(async (req, res) => {
  const { textChat, userId } = req.body;
  var currentTime = new Date();

  var currentOffset = currentTime.getTimezoneOffset();

  var ISTOffset = 330; // IST offset UTC +5:30

  var ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );

  // ISTTime now represents the time in IST coordinates

  var hoursIST = ISTTime.getHours();
  var minutesIST = ISTTime.getMinutes();
  let updateChat = await Chat.updateOne(
    {
      userId: userId,
    },
    {
      $push: {
        message: {
          textChat,
          time: hoursIST + ":" + minutesIST,
          messageOwner: "admin",
        },
      },
    }
  );
  updateChat.userId = userId;
  res.json(updateChat);
});

// chatShow
export const chatShow = asyncHandler(async (req, res) => {
  const { id } = req.query;
  let findChatUser = await User.find({
    // _id: id,
    myAdmin: id,
  });
  // let findChatShow = await Chat.find({
  //   adminId: id,
  // });

  // var newFindChatShow = findChatShow.filter((data) => {
  //   return data.message.length !== 0;
  // });

  // let findChatUser = await newFindChatShow.map(async (value) => {
  res.json(findChatUser);
  // });
});

// userMsgToAdmin
export const userMsgToAdmin = asyncHandler(async (req, res) => {
  const { id } = req.query;
  let newMsg = await Chat.find({ _id: id });

  res.json(newMsg);
});
