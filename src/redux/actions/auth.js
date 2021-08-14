import {
    LOGIN,
    SIGNUP,
    RESET,
    LOGOUT,
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