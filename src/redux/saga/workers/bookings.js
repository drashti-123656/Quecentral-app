import {showMessage} from 'react-native-flash-message';
import {put, call} from 'redux-saga/effects';
import {bookingListAPI} from './../../../services/api';
import {FETCH_BOOKINGS_SUCCESS} from '../../reduxConstants';

export function* fetchBookingsWorker(action) {
  try {
    const {data} = yield call(bookingListAPI);
    yield put({
      type: FETCH_BOOKINGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log('test');
  }
}




