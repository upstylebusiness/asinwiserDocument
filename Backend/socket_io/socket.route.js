import { Server } from "socket.io";
import { Chat } from "../model/chatSectionModel.js";
import { CONNECTION } from "./socketConstant.js";
// import addProductModel = from "../Models/addProductModel";

export const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["*"],
      credentials: true,
    },
  });

  let onlineUsers = [];

  const addUser = (username, socketId) => {
    !onlineUsers.some((user) => user.username === username) &&
      onlineUsers.push({ username, socketId });
  };

  const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
  };

  const getUser = (username) => {
    return onlineUsers.find((user) => {
      return user.username == username;
    });
  };

  io.on(CONNECTION, (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on("newUser", (username) => {
      console.log(username, "user connected");
      addUser(username, socket.id);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
      removeUser(socket.id);
    });

    // Chat.watch().on("change", (data) => {
    //   console.log("kjdfhkj", data);
    //   // console.log("===========>", data);
    //   if (data.operationType === "insert" || "update") {
    //     socket.emit("chat", data.documentKey);
    //   }
    // });

    socket.on("sendText", ({ senderName, id, chatValue }) => {
      console.log(id, "receiverreceiverreceiver receiver");
      // const receiver = getUser(receiverName);
      // console.log(receiver, "receiverreceiverreceiver receiver");
      io.emit("getNotification", {
        senderName,
        id,
        chatValue,
      });
    });
  });
};
