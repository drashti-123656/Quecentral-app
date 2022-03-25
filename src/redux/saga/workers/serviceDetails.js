import {showMessage} from 'react-native-flash-message';
import {put, call} from 'redux-saga/effects';
import {serviceDetailsAPI} from './../../../services/api';
import {
  FETCH_SERVICE_DETAILS_FAILED,
  FETCH_SERVICE_DETAILS_SUCCESS
} from '../../reduxConstants';
import EStyleSheet from 'react-native-extended-stylesheet';

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
    yield put({
      type: FETCH_SERVICE_DETAILS_FAILED,
      payload: error.response.data.response.response_message,
    });
    showMessage({
      message: error.response.data.response.response_message,
      type: 'info',
      backgroundColor: EStyleSheet.value('$WARNING_RED'),
    });
  }
}
