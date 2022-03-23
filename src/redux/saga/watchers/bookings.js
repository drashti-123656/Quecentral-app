import {takeLatest} from 'redux-saga/effects';
import {BOOK_SERVICE, FETCH_BOOKINGS} from '../../reduxConstants';
import {bookingServiceWorker, fetchBookingsWorker} from './../workers/bookings'

export function* watchBookingList() {
  yield takeLatest(FETCH_BOOKINGS, fetchBookingsWorker);
}

export function* watchBookService() {
  yield takeLatest(BOOK_SERVICE, bookingServiceWorker);
}
