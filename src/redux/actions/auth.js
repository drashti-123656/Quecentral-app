import {
    LOGIN,
    SIGNUP,
    RESET,
    LOGOUT,
    GOOGLE_LOGIN,
    FACEBOOK_LOGIN,
    VERIFY_OTP,
    SEND_OTP,
    HANDLE_CLOSE_MODAL
  } from '../reduxConstants';
  
export const login = (user) => ({
    type: LOGIN,
    user,
});

export const signup = (user) => ({
  type: SIGNUP,
  user,
});

export const logout = () => ({
  type: LOGOUT,
});

export const reset = () => ({
  type: RESET,
});

export const googleLoginAction = (payload) => ({
  type: GOOGLE_LOGIN,
  payload,
});

export const facebookLoginAction = (payload) => ({
  type: FACEBOOK_LOGIN,
  payload,
});

export const verifyOtpAction = (payload) => ({
  type: VERIFY_OTP,
  payload,
});

export const sendOtpAction = (payload) => ({
  type: SEND_OTP,
  payload,
});

export const handleCloseModalAction = (payload) => ({
  type: HANDLE_CLOSE_MODAL,
  payload,
});


