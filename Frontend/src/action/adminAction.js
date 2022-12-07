import axios from "axios";
import {
  ADMIN_DOCUMENT_ADD_ERR,
  ADMIN_DOCUMENT_ADD_REQUEST,
  ADMIN_DOCUMENT_ADD_SUCCESS,
  ADMIN_DOCUMENT_DRIVE_DELETE_ERR,
  ADMIN_DOCUMENT_DRIVE_DELETE_REQUEST,
  ADMIN_DOCUMENT_DRIVE_DELETE_SUCCESS,
  ADMIN_DOCUMENT_FIND_ERR,
  ADMIN_DOCUMENT_FIND_REQUEST,
  ADMIN_DOCUMENT_FIND_SUCCESS,
  ADMIN_DOCUMENT_VID_DELETE_ERR,
  ADMIN_DOCUMENT_VID_DELETE_REQUEST,
  ADMIN_DOCUMENT_VID_DELETE_SUCCESS,
  ADMIN_DRIVE_DOCUMENT_ADD_ERR,
  ADMIN_DRIVE_DOCUMENT_ADD_REQUEST,
  ADMIN_DRIVE_DOCUMENT_ADD_SUCCESS,
  ADMIN_DRIVE_DOCUMENT_FIND_ERR,
  ADMIN_DRIVE_DOCUMENT_FIND_REQUEST,
  ADMIN_DRIVE_DOCUMENT_FIND_SUCCESS,
  ADMIN_LOGIN_ERR,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_REGISTER_ERR,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_USER_FIND_ERR,
  ADMIN_USER_FIND_REQUEST,
  ADMIN_USER_FIND_SUCCESS,
  ADMIN_USER_REGISTER_ERR,
  ADMIN_USER_REGISTER_REQUEST,
  ADMIN_USER_REGISTER_SUCCESS,
} from "../Constant/adminConstant";

export const RegisterAction = (value) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_REGISTER_REQUEST });
    // headers: {
    //   Authorization: `Bearer ${thunkApi.extra.jwt}`
    // }
    let { data } = await axios.post("/api/admin/register", value);

    dispatch({ type: ADMIN_REGISTER_SUCCESS, payload: data });

    localStorage.setItem("loginInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ADMIN_REGISTER_ERR,
      payload: error.response.data.message,
    });
  }
};

//login
export const AdminLoginAction = (value) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_LOGIN_REQUEST });
    // headers: {
    //   Authorization: `Bearer ${thunkApi.extra.jwt}`
    // }
    let { data } = await axios.post("/api/admin/login", value);

    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("loginInfo", JSON.stringify(data));
  } catch (error) {
    
    dispatch({ type: ADMIN_LOGIN_ERR, payload: error.response.data.message });
  }
};

// userRegisterAction
//userFindAction
export const userRegisterAction =
  (details, phone) => async (dispatch, getState) => {
    const { name, email, password } = details;
    try {
      dispatch({ type: ADMIN_USER_REGISTER_REQUEST });

      let adminExit = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;
      let userID = adminExit.isUserExist._id;
      const obj = {
        name,
        email,
        phone,
        password,
        userID,
      };

      let { data } = await axios.post("/api/admin/userRegister", obj, {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: ADMIN_USER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ADMIN_USER_REGISTER_ERR, payload: error.response.data.error });
    }
  };

//userFindAction
export const userFindAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_USER_FIND_REQUEST });

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;
    let userID = adminExit.isUserExist._id;

    let { data } = await axios.get(`/api/admin/userFind/?id=${userID}`, {
      headers: {
        authorization: adminExit.Token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: ADMIN_USER_FIND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_USER_FIND_ERR, payload: error.response.data.error });
  }
};

// documentUploadAction
export const documentUploadAction = (details,selectUser) => async (dispatch, getState) => {
 
  try {
    dispatch({ type: ADMIN_DOCUMENT_ADD_REQUEST });

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    let userID = adminExit.isUserExist._id;

    let { data } = await axios.post("/api/admin/documentUpload", {details,userID,selectUser}, {
      headers: {
        authorization: adminExit.Token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: ADMIN_DOCUMENT_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_DOCUMENT_ADD_ERR, payload: error.response.data.error });
  }
};

// driveDocumentUploadAction
export const driveDocumentUploadAction = (details,selectUser) => async (dispatch, getState) => {
  alert(selectUser,'skdjfhskjdh')
  try {
    dispatch({ type: ADMIN_DRIVE_DOCUMENT_ADD_REQUEST });

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    let userID = adminExit.isUserExist._id;
    alert(userID)

    let { data } = await axios.post("/api/admin/driveDocumentUpload", {details,userID,selectUser}, {
      headers: {
        authorization: adminExit.Token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: ADMIN_DRIVE_DOCUMENT_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_DRIVE_DOCUMENT_ADD_ERR, payload: error.response.data.error });
  }
};

// documentFindAction
export const documentFindAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_DOCUMENT_FIND_REQUEST });

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;
    let userID = adminExit.isUserExist._id;

    let { data } = await axios.get(`/api/admin/documentFind/?id=${userID}`, {
      headers: {
        authorization: adminExit.Token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: ADMIN_DOCUMENT_FIND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_DOCUMENT_FIND_ERR, payload: error.response.data.error });
  }
};

// documentFindAction
export const driveDocumentFindAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_DRIVE_DOCUMENT_FIND_REQUEST });

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;
    let userID = adminExit.isUserExist._id;

    let { data } = await axios.get(`/api/admin/driveDocumentFind/?id=${userID}`, {
      headers: {
        authorization: adminExit.Token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: ADMIN_DRIVE_DOCUMENT_FIND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ADMIN_DRIVE_DOCUMENT_FIND_ERR, payload: error.response.data.error });
  }
};

// fileDocumentUploadAction
export const fileDocumentUploadAction =
  (docName, docFile) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_DOCUMENT_FIND_REQUEST });

      let adminExit = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;

     
      let userID = adminExit.isUserExist._id;
      const obj = {
        docName,
        docFile,
        userID
      };
      let { data } = await axios.post("/api/admin/documentFileAdd", obj,{
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: ADMIN_DOCUMENT_FIND_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ADMIN_DOCUMENT_FIND_ERR, payload: error.response.data.error });
    }
  };

  // deleteVidDocAction
  export const deleteVidDocAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_DOCUMENT_VID_DELETE_REQUEST });

      let adminExit = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;
      // let userID = adminExit.isUserExist._id;

      let { data } = await axios.delete(`/api/admin/documentVidDel/?id=${id}`,{
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: ADMIN_DOCUMENT_VID_DELETE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ADMIN_DOCUMENT_VID_DELETE_ERR, payload: error.response.data.error });
    }
  };

  // deleteDriveDocuAction
  export const deleteDriveDocuAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_DOCUMENT_DRIVE_DELETE_REQUEST });

      let adminExit = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;
      // let userID = adminExit.isUserExist._id;

      let { data } = await axios.delete(`/api/admin/deleteDriveDocu/?id=${id}`,{
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      dispatch({ type: ADMIN_DOCUMENT_DRIVE_DELETE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ADMIN_DOCUMENT_DRIVE_DELETE_ERR, payload: error.response.data.error });
    }
  };