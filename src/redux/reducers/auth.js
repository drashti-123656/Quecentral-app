import {
  LOGIN,
  SIGNUP,
  AUTH_SUCCESS,
  ERROR,
  RESET,
  LOGOUT,
} from '../reduxConstants';

const initialState = {
  authData: {isLoggedIn: false, token: null},
  userData: {OTPVerification: false},
  miscData: {
    error: false,
    success: false,
    errorMsg: '',
  },
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
