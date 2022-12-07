import express from "express";
import { findLinkDocument, findLinkvideo } from "../controller/userController.js";
const router = express.Router();


//register Admin
router.route("/findLinkvideo").get(findLinkvideo);

// findLinkDocument
router.route("/findLinkDocument").get(findLinkDocument);


export default router;