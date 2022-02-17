import {
    LOGIN,
    SIGNUP,
    RESET,
    LOGOUT,
    REQUEST_BOOOKINGLIST_DATA,
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

export const requestBookingListData = () => ({ 
  type: REQUEST_BOOOKINGLIST_DATA ,
  
  
});