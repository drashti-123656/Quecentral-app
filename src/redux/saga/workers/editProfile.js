import {showMessage} from 'react-native-flash-message';
import {put, call} from 'redux-saga/effects';
import {cityListAPI, fetchStateAPI, updateProfileAPI} from '../../../services/editProfile';
import {FETCH_CITY_SUCCESS, FETCH_STATE_SUCCESS, UPDATE_PROFILE_FAILED, UPDATE_PROFILE_SUCCESS} from '../../reduxConstants';

export function* fetchStateWorker(action) {
  try {
    const {data} = yield call(fetchStateAPI, 101);
    yield put({
      type: FETCH_STATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log('test');
  }
}

export function* fetchCityWorker(action) {
  try {
    const {
      payload,
    } = action;
    
    const {data} = yield call(cityListAPI, payload[0]);
    
    console.log('data', data)
    yield put({
      type: FETCH_CITY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log('test');
  }
}

export function* updateProfileWorker(action) {
  try {
    const {
      payload,
    } = action;
    const {data} = yield call(updateProfileAPI, payload);
    yield put({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

  } catch (error) {
    showMessage({
      message: 'Profile update failed',
      type: 'info',
      backgroundColor: 'red',
    });

    yield put({
      type: UPDATE_PROFILE_FAILED,
      payload: error,
    });
  }
}


