import {
    LOGIN,
    SIGNUP,
    RESET,
    LOGOUT,
    GOOGLE_LOGIN,
    FACEBOOK_LOGIN
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

