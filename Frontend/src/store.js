import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  AdminFindReducer,
  AdminLoginReducer,
  chatShowReducer,
  chatStarClickReducer,
  deleteDriveDocuReducer,
  deleteVidDocReducer,
  documentFindReducer,
  documentUploadReducer,
  driveDocumentFindReducer,
  driveDocumentUploadReducer,
  RegisterAdminReducer,
  searchForMessageReducer,
  submitNewMessageReducer,
  userFindReducer,
  userMsgToAdminReducer,
  userRegisterReducer,
} from "./Reducer/AdminReducer";
import {
  adminSearchSocketReducer,
  findUserDocumentLinkReducer,
  findUserVideoLinkReducer,
  userChatFindReducer,
  userChatSubmitReducer,
} from "./Reducer/userReducer";

const appReducer = combineReducers({
  RegisterAdmin: RegisterAdminReducer,
  AdminLogin: AdminLoginReducer,
  userRegister: userRegisterReducer,
  userFind: userFindReducer,
  documentUpload: documentUploadReducer,
  documentFind: documentFindReducer,
  deleteVidDoc: deleteVidDocReducer,
  driveDocumentUpload: driveDocumentUploadReducer,
  driveDocumentFind: driveDocumentFindReducer,
  deleteDriveDocu: deleteDriveDocuReducer,
  AdminFind: AdminFindReducer,
  searchForMessage: searchForMessageReducer,
  chatStarClick: chatStarClickReducer,
  submitNewMessage: submitNewMessageReducer,
  chatShow: chatShowReducer,
  userMsgToAdmin: userMsgToAdminReducer,

  // user

  findUserVideoLink: findUserVideoLinkReducer,
  findUserDocumentLink: findUserDocumentLinkReducer,
  userChatFind: userChatFindReducer,
  userChatSubmit: userChatSubmitReducer,
  adminSearchSocket :adminSearchSocketReducer
});

let Middleware = [thunk];

export const store = createStore(appReducer, applyMiddleware(...Middleware));
