import {
  LOGIN,
  SIGNUP,
  AUTH_SUCCESS,
  ERROR,
  RESET,
  LOGOUT,
  SEND_OTP_SUCCESS,
  HANDLE_CLOSE_MODAL,
  STORE_FACEBOOK_ID,
  STORE_GOOGLE_ID,
} from '../reduxConstants';

const initialState = {
  authData: {
    isLoggedIn: false,
    token: null,
    mobileNo: null,
    facebookId: null,
    googleId: null,
  },
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
        authData: {...state.authData, mobileNo: action.payload.mobile_no},
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
        showOtpModal: false,
      };

    case ERROR:
      return {
        ...state,
        miscData: action.miscData,
      };

    case LOGOUT:
      return {
        authData: {
          isLoggedIn: false,
          token: null,
          mobileNo: null,
          facebookId: null,
          googleId: null,
        },
        userData: {},
        miscData: {error: false, success: false, errorMsg: ''},
      };

    case RESET:
      return {
        ...state,
        miscData: {error: false, success: false, errorMsg: ''},
      };

    case STORE_FACEBOOK_ID:
      return {
        ...state,
        authData: {...state.authData, facebookId: action.payload.token},
      };

    case STORE_GOOGLE_ID:
      return {
        ...state,
        authData: {...state.authData, googleId: action.payload.token},
      };

    default:
      return state;
  }
};

export default reducer;
