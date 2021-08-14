import { put, call } from 'redux-saga/effects';

import {
    AUTH_SUCCESS,
    ERROR,
} from '../../reduxConstants';

import {
    login,
    signup,
} from './../../../services/auth';

export function* userLoginAuth({ user }) {
    try {
        const { data } = yield call(login, user);
        if (data.response.response_code === '200') {
            yield put({
                type: AUTH_SUCCESS,
                authData: { isLoggedIn: true, token: data.data.user_details.token },
                userData: data.data.provider_details,
            });
        } else {
            yield put({
                type: ERROR,
                miscData: { error: true, errorMsg: data.response.response_message },
            });
        }


    } catch {

    }
}

export function* userSignupAuth({ user }) {
    try {
        const { data } = yield call(signup, user);

        console.log(data)

        if (data.response.response_code == 200) {
            yield put({
                type: AUTH_SUCCESS,
                userData:{OTPVerification: true},
            });
        } else {
            yield put({
                type: ERROR,
                miscData: { error: true, errorMsg: data.response.response_message },
            });
        }


    } catch {

    }
}