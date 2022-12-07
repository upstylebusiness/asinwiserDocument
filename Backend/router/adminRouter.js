import express from "express";
import { checkout, deleteDriveDocu, documentFileAdd, documentFind, documentUpload, documentVidDel, driveDocumentFind, driveDocumentUpload, LoginAdmin, registerAdmin, userFind, userRegister } from "../controller/adminController.js";

const router = express.Router();


//register Admin
router.route("/register").post(registerAdmin);

//login Admin
router.route("/login").post(LoginAdmin);

// userRegister
router.route("/userRegister").post(userRegister)

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

export default router;