import express from "express";
import {
  findLinkDocument,
  findLinkvideo,
  userChatFind,
  userChatSubmit,
} from "../controller/userController.js";
const router = express.Router();

//register Admin
router.route("/findLinkvideo").get(findLinkvideo);

// findLinkDocument
router.route("/findLinkDocument").get(findLinkDocument);

// userChatFind
router.route("/userChatFind").get(userChatFind);

// userChatSubmit
router.route("/userChatSubmit").post(userChatSubmit);

export default router;
