import {
  USER_DOCUMENT_LINK_FIND_ERR,
  USER_DOCUMENT_LINK_FIND_REQUEST,
  USER_DOCUMENT_LINK_FIND_SUCCESS,
  USER_VIDEO_LINK_FIND_ERR,
  USER_VIDEO_LINK_FIND_REQUEST,
  USER_VIDEO_LINK_FIND_SUCCESS,
} from "../Constant/userConstant";

export const findUserVideoLinkReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_VIDEO_LINK_FIND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_VIDEO_LINK_FIND_SUCCESS:
      return {
        ...state,
        loading: false,
        userFindVideoData: action.payload,
      };
    case USER_VIDEO_LINK_FIND_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// findUserDocumentLinkReducer
export const findUserDocumentLinkReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DOCUMENT_LINK_FIND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DOCUMENT_LINK_FIND_SUCCESS:
      return {
        ...state,
        loading: false,
        userFindDocumentData: action.payload,
      };
    case USER_DOCUMENT_LINK_FIND_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};