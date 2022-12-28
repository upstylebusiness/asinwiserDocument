import express from "express";
import {
  AdminFind,
  chatShow,
  chatStarClick,
  checkout,
  deleteDriveDocu,
  documentFileAdd,
  documentFind,
  documentUpload,
  documentVidDel,
  driveDocumentFind,
  driveDocumentUpload,
  LoginAdmin,
  registerAdmin,
  searchForMessage,
  submitNewMessage,
  userFind,
  userMsgToAdmin,
  userRegister,
} from "../controller/adminController.js";

const router = express.Router();

//register Admin
router.route("/register").post(registerAdmin);

//login Admin
router.route("/login").post(LoginAdmin);

// userRegister
router.route("/userRegister").post(userRegister);

//userFind
router.route("/userFind").get(userFind);

// documentUpload
router.route("/documentUpload").post(documentUpload);

// documentFind
router.route("/documentFind").get(documentFind);

// documentFileAdd
router.route("/documentFileAdd").post(documentFileAdd);
// checkout
router.route("/checkout").post(checkout);

// documentVidDel
router.route("/documentVidDel").delete(documentVidDel);

// driveDocumentUpload
router.route("/driveDocumentUpload").post(driveDocumentUpload);

// driveDocumentFind
router.route("/driveDocumentFind").get(driveDocumentFind);

// deleteDriveDocu
router.route("/deleteDriveDocu").delete(deleteDriveDocu);

// AdminFind
router.route("/AdminFind").get(AdminFind);

// searchForMessage
router.route("/searchForMessage").post(searchForMessage);

// chatStarClickt
router.route("/chatStarClick").post(chatStarClick);

// submitNewMessage
router.route("/submitNewMessage").post(submitNewMessage);

// chatShow
router.route("/chatShow").get(chatShow);

// userMsgToAdmin
router.route("/userMsgToAdmin").get(userMsgToAdmin);

export default router;
