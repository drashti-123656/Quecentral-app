import {showMessage} from 'react-native-flash-message';
import {put, call} from 'redux-saga/effects';
import {searchServiceAPI} from './../../../services/api';
import {
  FETCH_SERVICES_SUCCESS,
} from '../../reduxConstants';

export function* fetchServicesWorker(action) {
  try {
    const {payload} = action;
    const {data} = yield call(searchServiceAPI, payload);
   
    yield put({
      type: FETCH_SERVICES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log('test');
  }
}
