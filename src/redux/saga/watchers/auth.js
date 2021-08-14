import {takeLatest} from 'redux-saga/effects';

import {
    LOGIN,
    SIGNUP,
  } from '../../reduxConstants';

  import {
    userLoginAuth,
    userSignupAuth,
  } from './../workers/auth';


  export function* watchLoginUser(){
    yield takeLatest(LOGIN, userLoginAuth)
  }

  export function* watchSignup() {
    yield takeLatest(SIGNUP, userSignupAuth);
  }
  