import axios from "axios";
import { URL_API } from "../baseUrl/url";
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
  ADMIN_FIND_ERR,
  ADMIN_FIND_REQUEST,
  ADMIN_FIND_SUCCESS,
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
  CHAT_SHOW_SECTION_ERR,
  CHAT_SHOW_SECTION_REQUEST,
  CHAT_SHOW_SECTION_SUCCESS,
  CHAT_START_CLICK_ERR,
  CHAT_START_CLICK_REQUEST,
  CHAT_START_CLICK_SUCCESS,
  SEARCH_FOR_MESSAGE_ERR,
  SEARCH_FOR_MESSAGE_REQUEST,
  SEARCH_FOR_MESSAGE_SUCCESS,
  SUBMIT_NEW_MESSAGE_ERR,
  SUBMIT_NEW_MESSAGE_REQUEST,
  SUBMIT_NEW_MESSAGE_SUCCESS,
  USER_MSG_TOADMIN_ERR,
  USER_MSG_TOADMIN_REQUEST,
  USER_MSG_TOADMIN_SUCCESS,
  USER_STATUS_CHANGE_ERR,
  USER_STATUS_CHANGE_REQUEST,
  USER_STATUS_CHANGE_SUCCESS,
} from "../Constant/adminConstant";

export const RegisterAction = (value) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_REGISTER_REQUEST });
    // headers: {
    //   Authorization: `Bearer ${thunkApi.extra.jwt}`
    // }
    let { data } = await axios.post(`${URL_API}/api/admin/register`, value);

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
    let { data } = await axios.post(`${URL_API}/api/admin/login`, value);

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

      let { data } = await axios.post(
        `${URL_API}/api/admin/userRegister`,
        obj,
        {
          headers: {
            authorization: adminExit.Token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: ADMIN_USER_REGISTER_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response.data.error);
      dispatch({
        type: ADMIN_USER_REGISTER_ERR,
        payload: error.response.data.error,
      });
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

    let { data } = await axios.get(
      `${URL_API}/api/admin/userFind/?id=${userID}`,
      {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: ADMIN_USER_FIND_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({ type: ADMIN_USER_FIND_ERR, payload: error.response.data.error });
  }
};

// documentUploadAction
export const documentUploadAction =
  (details, selectUser) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_DOCUMENT_ADD_REQUEST });

      let adminExit = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;

      let userID = adminExit.isUserExist._id;

      let { data } = await axios.post(
        `${URL_API}/api/admin/documentUpload`,
        { details, userID, selectUser },
        {
          headers: {
            authorization: adminExit.Token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: ADMIN_DOCUMENT_ADD_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response.data.error);
      dispatch({
        type: ADMIN_DOCUMENT_ADD_ERR,
        payload: error.response.data.error,
      });
    }
  };

// driveDocumentUploadAction
export const driveDocumentUploadAction =
  (details, selectUser) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_DRIVE_DOCUMENT_ADD_REQUEST });

      let adminExit = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;

      let userID = adminExit.isUserExist._id;

      let { data } = await axios.post(
        `${URL_API}/api/admin/driveDocumentUpload`,
        { details, userID, selectUser },
        {
          headers: {
            authorization: adminExit.Token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: ADMIN_DRIVE_DOCUMENT_ADD_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response.data.error);
      dispatch({
        type: ADMIN_DRIVE_DOCUMENT_ADD_ERR,
        payload: error.response.data.error,
      });
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

    let { data } = await axios.get(
      `${URL_API}/api/admin/documentFind/?id=${userID}`,
      {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: ADMIN_DOCUMENT_FIND_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: ADMIN_DOCUMENT_FIND_ERR,
      payload: error.response.data.error,
    });
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

    let { data } = await axios.get(
      `${URL_API}/api/admin/driveDocumentFind/?id=${userID}`,
      {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: ADMIN_DRIVE_DOCUMENT_FIND_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: ADMIN_DRIVE_DOCUMENT_FIND_ERR,
      payload: error.response.data.error,
    });
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
        userID,
      };
      let { data } = await axios.post(
        `${URL_API}/api/admin/documentFileAdd`,
        obj,
        {
          headers: {
            authorization: adminExit.Token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: ADMIN_DOCUMENT_FIND_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response.data.error);
      dispatch({
        type: ADMIN_DOCUMENT_FIND_ERR,
        payload: error.response.data.error,
      });
    }
  };

// deleteVidDocAction
export const deleteVidDocAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_DOCUMENT_VID_DELETE_REQUEST });

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;
    // let userID = adminExit.isUserExist._id;

    let { data } = await axios.delete(
      `${URL_API}/api/admin/documentVidDel/?id=${id}`,
      {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: ADMIN_DOCUMENT_VID_DELETE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: ADMIN_DOCUMENT_VID_DELETE_ERR,
      payload: error.response.data.error,
    });
  }
};

// deleteDriveDocuAction
export const deleteDriveDocuAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_DOCUMENT_DRIVE_DELETE_REQUEST });

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;
    // let userID = adminExit.isUserExist._id;

    let { data } = await axios.delete(
      `${URL_API}/api/admin/deleteDriveDocu/?id=${id}`,
      {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: ADMIN_DOCUMENT_DRIVE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: ADMIN_DOCUMENT_DRIVE_DELETE_ERR,
      payload: error.response.data.error,
    });
  }
};

// userStatusChangeAction
export const userStatusChangeAction =
  (id, status) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_STATUS_CHANGE_REQUEST });

      let adminExit = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;
      // let userID = adminExit.isUserExist._id;

      let { data } = await axios.put(
        `${URL_API}/api/admin/userStatusChange/?id=${id}`,
        {
          headers: {
            authorization: adminExit.Token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: USER_STATUS_CHANGE_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response.data.error);
      dispatch({
        type: USER_STATUS_CHANGE_ERR,
        payload: error.response.data.error,
      });
    }
  };

// AdminFindAction
export const AdminFindAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_FIND_REQUEST });

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;
    let userID = adminExit.isUserExist._id;

    let { data } = await axios.get(
      `${URL_API}/api/admin/AdminFind/?id=${userID}`,
      {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: ADMIN_FIND_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: ADMIN_FIND_ERR,
      payload: error.response.data.error,
    });
  }
};

// searchForMessageAction
export const searchForMessageAction = (value) => async (dispatch, getState) => {
  try {
    dispatch({ type: SEARCH_FOR_MESSAGE_REQUEST });

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;
    let userID = adminExit.isUserExist._id;

    let { data } = await axios.post(
      `${URL_API}/api/admin/searchForMessage`,
      { value, userID },
      {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: SEARCH_FOR_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: SEARCH_FOR_MESSAGE_ERR,
      payload: error.response.data.error,
    });
  }
};

// chatStarClicktAction
export const chatStarClickAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHAT_START_CLICK_REQUEST });

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;
    let userID = adminExit.isUserExist._id;
    const obj = { id, userID };
    let { data } = await axios.post(`${URL_API}/api/admin/chatStarClick`, obj, {
      headers: {
        authorization: adminExit.Token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: CHAT_START_CLICK_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: CHAT_START_CLICK_ERR,
      payload: error.response.data.error,
    });
  }
};

// submitNewMessageAction
export const submitNewMessageAction =
  (userId, textChat) => async (dispatch, getState) => {
    try {
      dispatch({ type: SUBMIT_NEW_MESSAGE_REQUEST });

      let adminExit = localStorage.getItem("loginInfo")
        ? JSON.parse(localStorage.getItem("loginInfo"))
        : null;
      let userID = adminExit.isUserExist._id;
      let { data } = await axios.post(
        `${URL_API}/api/admin/submitNewMessage`,
        { textChat, userId },
        {
          headers: {
            authorization: adminExit.Token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: SUBMIT_NEW_MESSAGE_SUCCESS, payload: data });
    } catch (error) {
      console.log(error.response.data.error);
      dispatch({
        type: SUBMIT_NEW_MESSAGE_ERR,
        payload: error.response.data.error,
      });
    }
  };

// chatFindAction
export const chatShowAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CHAT_SHOW_SECTION_REQUEST });

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    let userID = adminExit.isUserExist._id;

    let { data } = await axios.get(
      `${URL_API}/api/admin/chatShow/?id=${userID}`,
      {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: CHAT_SHOW_SECTION_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: CHAT_SHOW_SECTION_ERR,
      payload: error.response.data.error,
    });
  }
};

// userMsgToAdminAction
export const userMsgToAdminAction = (ID) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_MSG_TOADMIN_REQUEST });

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    let userID = adminExit.isUserExist._id;

    let { data } = await axios.get(
      `${URL_API}/api/admin/userMsgToAdmin/?id=${ID}`,
      {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: USER_MSG_TOADMIN_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({
      type: USER_MSG_TOADMIN_ERR,
      payload: error.response.data.error,
    });
  }
};
