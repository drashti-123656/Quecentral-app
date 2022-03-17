import {put, call} from 'redux-saga/effects';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';

import {AUTH_SUCCESS, ERROR} from '../../reduxConstants';
import {facebookLoginAPI, googleLoginAPI, login, signup} from './../../../services/auth';
import React from 'react';
import {navigate} from '../../../navigation/RootNavigation';

export const navigationRef = React.createRef();

export function* userLoginAuth({user}) {
  try {
    const {data} = yield call(login, user);
    if (data.response.response_code === '200') {
      yield put({
        type: AUTH_SUCCESS,
        authData: {isLoggedIn: true, token: data.data.user_details.token},
        userData: data.data.user_details,
      });
    } else {
      yield put({
        type: ERROR,
        miscData: {error: true, errorMsg: data.response.response_message},
      });
    }
  } catch {}
}

export function* userSignupAuth({user}) {
  try {
    const {data} = yield call(signup, user);

    console.log(data);

    if (data.response.response_code == 200) {
      yield put({
        type: AUTH_SUCCESS,
        userData: {OTPVerification: true},
      });
    } else {
      yield put({
        type: ERROR,
        miscData: {error: true, errorMsg: data.response.response_message},
      });
    }
  } catch {}
}

export function* googleLoginWorker(payload) {
  try {
    const {data} = yield call(googleLoginAPI, payload);
    // if (data.response.response_code === '200') {
    //   yield put({
    //     type: AUTH_SUCCESS,
    //     authData: {isLoggedIn: true, token: data.data.user_details.token},
    //     userData: data.data.user_details,
    //   });
    // } else {
    //   yield put({
    //     type: ERROR,
    //     miscData: {error: true, errorMsg: data.response.response_message},
    //   });
    // }
    yield put({
          type: AUTH_SUCCESS,
          authData: {isLoggedIn: true, token: data.data.user_details.token},
          userData: data.data.user_details,
        });
  } catch {

  }
}

export function* facebookLoginWorker({payload}) {
  try {
    const {data} = yield call(facebookLoginAPI, payload);
    yield put({
          type: AUTH_SUCCESS,
          authData: {isLoggedIn: true, token: data.token},
          userData: data,
        });
  } catch {
    navigate('EmailLogin');
    
  }
}
