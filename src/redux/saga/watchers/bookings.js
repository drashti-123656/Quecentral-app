import {takeLatest} from 'redux-saga/effects';
import {FETCH_BOOKINGS} from '../../reduxConstants';
import {fetchBookingsWorker} from './../workers/bookings'

export function* watchBookingList() {
  yield takeLatest(FETCH_BOOKINGS, fetchBookingsWorker);
}
