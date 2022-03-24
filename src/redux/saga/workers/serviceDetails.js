import {showMessage} from 'react-native-flash-message';
import {put, call} from 'redux-saga/effects';
import {serviceDetailsAPI} from './../../../services/api';
import {
  FETCH_SERVICE_DETAILS_SUCCESS
} from '../../reduxConstants';

export function* fetchServiceDetailsWorker({payload}) {
  try {
    const {id} = payload;
    const {data} = yield call(serviceDetailsAPI, id);
    yield put({
      type: FETCH_SERVICE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
}
