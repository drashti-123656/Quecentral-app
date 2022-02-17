import {takeLatest} from 'redux-saga/effects';

import {
    LOGIN,
    SIGNUP,
    REQUEST_BOOOKINGLIST_DATA,
    RECEIVE_BOOKINGLIST_DATA
  } from '../../reduxConstants';

  import {
    userLoginAuth,
    userSignupAuth,
    userReceiveAll
  } from './../workers/auth';


  export function* watchLoginUser(){
    yield takeLatest(LOGIN, userLoginAuth)
  }

  export function* watchSignup() {
    yield takeLatest(SIGNUP, userSignupAuth);
  }
  
  export function* watchBookingList() {
    yield takeLatest(REQUEST_BOOOKINGLIST_DATA, userReceiveAll);
  }
  