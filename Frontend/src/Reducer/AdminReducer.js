import {
  ADMIN_DOCUMENT_ADD_ERR,
  ADMIN_DOCUMENT_ADD_REQUEST,
  ADMIN_DOCUMENT_ADD_SUCCESS,
  ADMIN_DOCUMENT_FIND_ERR,
  ADMIN_DOCUMENT_FIND_REQUEST,
  ADMIN_DOCUMENT_FIND_SUCCESS,
  ADMIN_DOCUMENT_VID_DELETE_ERR,
  ADMIN_DOCUMENT_VID_DELETE_REQUEST,
  ADMIN_DOCUMENT_VID_DELETE_SUCCESS,
  ADMIN_DRIVE_DOCUMENT_ADD_ERR,
  ADMIN_DRIVE_DOCUMENT_ADD_REQUEST,
  ADMIN_DRIVE_DOCUMENT_ADD_SUCCESS,
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
  ADMIN_DOCUMENT_DRIVE_DELETE_REQUEST,
  ADMIN_DOCUMENT_DRIVE_DELETE_SUCCESS,
  ADMIN_DOCUMENT_DRIVE_DELETE_ERR,
  ADMIN_FIND_REQUEST,
  ADMIN_FIND_SUCCESS,
  ADMIN_FIND_ERR,
  SEARCH_FOR_MESSAGE_REQUEST,
  SEARCH_FOR_MESSAGE_SUCCESS,
  SEARCH_FOR_MESSAGE_ERR,
  CHAT_START_CLICK_REQUEST,
  CHAT_START_CLICK_SUCCESS,
  CHAT_START_CLICK_ERR,
  SUBMIT_NEW_MESSAGE_REQUEST,
  SUBMIT_NEW_MESSAGE_SUCCESS,
  SUBMIT_NEW_MESSAGE_ERR,
  CHAT_SHOW_SECTION_REQUEST,
  CHAT_SHOW_SECTION_SUCCESS,
  CHAT_SHOW_SECTION_ERR,
  USER_MSG_TOADMIN_REQUEST,
  USER_MSG_TOADMIN_SUCCESS,
  USER_MSG_TOADMIN_ERR,
} from "../Constant/adminConstant";

export const RegisterAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        registerData: action.payload,
      };
    case ADMIN_REGISTER_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//AdminLogin
export const AdminLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        Login: action.payload,
      };
    case ADMIN_LOGIN_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//userRegisterAction
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInsert: action.payload,
      };
    case ADMIN_USER_REGISTER_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};

//user find
export const userFindReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_USER_FIND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_USER_FIND_SUCCESS:
      return {
        ...state,
        loading: false,
        showUser: action.payload,
      };
    case ADMIN_USER_FIND_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// documentUploadReducer

export const documentUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DOCUMENT_ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_DOCUMENT_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        uploadDocument: action.payload,
      };
    case ADMIN_DOCUMENT_ADD_ERR:
      return {
        ...state,
        loading: false,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// documentFindReducer
export const documentFindReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DOCUMENT_FIND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_DOCUMENT_FIND_SUCCESS:
      return {
        ...state,
        loading: false,
        findDocument: action.payload,
      };
    case ADMIN_DOCUMENT_FIND_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// deleteVidDocReducer
export const deleteVidDocReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DOCUMENT_VID_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_DOCUMENT_VID_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        deleDocument: action.payload,
      };
    case ADMIN_DOCUMENT_VID_DELETE_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//driveDocumentUploadReducer
export const driveDocumentUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DRIVE_DOCUMENT_ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_DRIVE_DOCUMENT_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        addDriveDocument: action.payload,
      };
    case ADMIN_DRIVE_DOCUMENT_ADD_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// driveDocumentFindReducer
export const driveDocumentFindReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DRIVE_DOCUMENT_FIND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_DRIVE_DOCUMENT_FIND_SUCCESS:
      return {
        ...state,
        loading: false,
        findDriveDocument: action.payload,
      };
    case ADMIN_DRIVE_DOCUMENT_FIND_SUCCESS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// deleteDriveDocuReducer
export const deleteDriveDocuReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DOCUMENT_DRIVE_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_DOCUMENT_DRIVE_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        dleteDriveDocument: action.payload,
      };
    case ADMIN_DOCUMENT_DRIVE_DELETE_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// AdminFindReducer
export const AdminFindReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_FIND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_FIND_SUCCESS:
      return {
        ...state,
        loading: false,
        findAdmin: action.payload,
      };
    case ADMIN_FIND_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// searchForMessageReducer
export const searchForMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_FOR_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_FOR_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        findSearch: action.payload,
      };
    case SEARCH_FOR_MESSAGE_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// chatStarClickReducer
export const chatStarClickReducer = (state = [], action) => {
  switch (action.type) {
    case CHAT_START_CLICK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHAT_START_CLICK_SUCCESS:
      return {
        ...state,
        loading: false,
        findChat: action.payload,
      };
    case CHAT_START_CLICK_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// submitNewMessageReducer
export const submitNewMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBMIT_NEW_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUBMIT_NEW_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        submitMessage: action.payload,
      };
    case SUBMIT_NEW_MESSAGE_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// chatShowReducer

export const chatShowReducer = (state = {}, action) => {
  switch (action.type) {
    case CHAT_SHOW_SECTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHAT_SHOW_SECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        chatShowSection: action.payload,
      };
    case CHAT_SHOW_SECTION_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// userMsgToAdminReducer
export const userMsgToAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_MSG_TOADMIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_MSG_TOADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userNewMsg: action.payload,
      };
    case USER_MSG_TOADMIN_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
