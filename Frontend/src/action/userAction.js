import axios from "axios";
import {
  ADMIN_SEARCH_SOCKET_ERR,
  ADMIN_SEARCH_SOCKET_REQUEST,
  ADMIN_SEARCH_SOCKET_SUCCESS,
  USER_CHAT_FIND_ERR,
  USER_CHAT_FIND_REQUEST,
  USER_CHAT_FIND_SUCCESS,
  USER_CHAT_SUBMIT_ERR,
  USER_CHAT_SUBMIT_REQUEST,
  USER_CHAT_SUBMIT_SUCCESS,
  USER_DOCUMENT_LINK_FIND_ERR,
  USER_DOCUMENT_LINK_FIND_REQUEST,
  USER_DOCUMENT_LINK_FIND_SUCCESS,
  USER_VIDEO_LINK_FIND_ERR,
  USER_VIDEO_LINK_FIND_REQUEST,
  USER_VIDEO_LINK_FIND_SUCCESS,
} from "../Constant/userConstant";
import { URL_API } from "../baseUrl/url";

// findUserVideoLinkAction
export const findUserVideoLinkAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_VIDEO_LINK_FIND_REQUEST });
    // headers: {
    //   Authorization: `Bearer ${thunkApi.extra.jwt}`
    // }

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    let userID = adminExit.isUserExist._id;

    let { data } = await axios.get(
      `${URL_API}/api/user/findLinkvideo/?id=${userID}`
    );

    dispatch({ type: USER_VIDEO_LINK_FIND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_VIDEO_LINK_FIND_ERR,
      payload: error.response.data.message,
    });
  }
};

// findUserDocumentLinkAction
export const findUserDocumentLinkAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DOCUMENT_LINK_FIND_REQUEST });
    // headers: {
    //   Authorization: `Bearer ${thunkApi.extra.jwt}`
    // }

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    let userID = adminExit.isUserExist._id;

    let { data } = await axios.get(
      `${URL_API}/api/user/findLinkDocument/?id=${userID}`
    );

    dispatch({ type: USER_DOCUMENT_LINK_FIND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DOCUMENT_LINK_FIND_ERR,
      payload: error.response.data.message,
    });
  }
};

// userChatFindAction
export const userChatFindAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_CHAT_FIND_REQUEST });
    // headers: {
    //   Authorization: `Bearer ${thunkApi.extra.jwt}`
    // }

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    let userID = adminExit.isUserExist._id;

    let { data } = await axios.get(
      `${URL_API}/api/user/userChatFind/?id=${userID}`
    );

    dispatch({ type: USER_CHAT_FIND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_CHAT_FIND_ERR,
      payload: error.response.data.message,
    });
  }
};

// userChatSubmitAction
export const userChatSubmitAction = (value) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_CHAT_SUBMIT_REQUEST });
    // headers: {
    //   Authorization: `Bearer ${thunkApi.extra.jwt}`
    // }

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    let userID = adminExit.isUserExist._id;

    let { data } = await axios.post(
      `${URL_API}/api/user/userChatSubmit`,
      { value, userID },
      {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: USER_CHAT_SUBMIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_CHAT_SUBMIT_ERR,
      payload: error.response.data.message,
    });
  }
};

// adminSearchSocketAction
export const adminSearchSocketAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_SEARCH_SOCKET_REQUEST });
    // headers: {
    //   Authorization: `Bearer ${thunkApi.extra.jwt}`
    // }

    let adminExit = localStorage.getItem("loginInfo")
      ? JSON.parse(localStorage.getItem("loginInfo"))
      : null;

    let userID = adminExit.isUserExist._id;

    let { data } = await axios.get(
      `${URL_API}/api/user/adminSearchSocket/?id=${userID}`,
      {
        headers: {
          authorization: adminExit.Token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: ADMIN_SEARCH_SOCKET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_SEARCH_SOCKET_ERR,
      payload: error.response.data.message,
    });
  }
};
