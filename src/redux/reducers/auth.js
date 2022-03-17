import {
  LOGIN,
  SIGNUP,
  AUTH_SUCCESS,
  ERROR,
  RESET,
  LOGOUT,
  SEND_OTP_SUCCESS,
  HANDLE_CLOSE_MODAL,
} from '../reduxConstants';

const initialState = {
  authData: {isLoggedIn: false, token: null},
  userData: {OTPVerification: false},
  miscData: {
    error: false,
    success: false,
    errorMsg: '',
  },
  showOtpModal: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
      };

    case SIGNUP:
      return {
        ...state,
      };

    case SEND_OTP_SUCCESS:
      return {
        ...state,
        showOtpModal: true,
      };

    case HANDLE_CLOSE_MODAL:
      return {
        ...state,
        showOtpModal: false,
      };

    case AUTH_SUCCESS:
      return {
        ...state,
        authData: action.authData || state.authData,
        userData: action.userData || state.userData,
      };

    case ERROR:
      return {
        ...state,
        miscData: action.miscData,
      };

    case LOGOUT:
      return {
        authData: {isLoggedIn: false, token: null},
        userData: {},
        miscData: {error: false, success: false, errorMsg: ''},
      };

    case RESET:
      return {
        ...state,
        miscData: {error: false, success: false, errorMsg: ''},
      };
    default:
      return state;
  }
};

export default reducer;
