import axios from "axios";
import { USER_DOCUMENT_LINK_FIND_ERR, USER_DOCUMENT_LINK_FIND_REQUEST, USER_DOCUMENT_LINK_FIND_SUCCESS, USER_VIDEO_LINK_FIND_ERR, USER_VIDEO_LINK_FIND_REQUEST, USER_VIDEO_LINK_FIND_SUCCESS } from "../Constant/userConstant";

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

      let { data } = await axios.get(`/api/user/findLinkvideo/?id=${userID}`);
  
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

      let { data } = await axios.get(`/api/user/findLinkDocument/?id=${userID}`);
  
      dispatch({ type: USER_DOCUMENT_LINK_FIND_SUCCESS, payload: data });
  
    } catch (error) {
      dispatch({
        type: USER_DOCUMENT_LINK_FIND_ERR,
        payload: error.response.data.message,
      });
    }
  };