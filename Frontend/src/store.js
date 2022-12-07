import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  AdminLoginReducer,
  deleteDriveDocuReducer,
  deleteVidDocReducer,
  documentFindReducer,
  documentUploadReducer,
  driveDocumentFindReducer,
  driveDocumentUploadReducer,
  RegisterAdminReducer,
  userFindReducer,
  userRegisterReducer,
} from "./Reducer/AdminReducer";
import { findUserDocumentLinkReducer, findUserVideoLinkReducer } from "./Reducer/userReducer";

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

  // user

  findUserVideoLink: findUserVideoLinkReducer,
  findUserDocumentLink : findUserDocumentLinkReducer
});

let Middleware = [thunk];

export const store = createStore(appReducer, applyMiddleware(...Middleware));
