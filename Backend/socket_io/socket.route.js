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
  console.log("server***************************************************");

  io.on(CONNECTION, (socket) => {
    console.log("kjdfhkj", socket.id);

    Chat.watch().on("change", (data) => {
      // console.log("===========>", data);
      if (data.operationType === "insert" || "update") {
       
        socket.emit("chat", data.documentKey);
      }
    });
  });
};
