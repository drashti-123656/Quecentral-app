import {showMessage} from 'react-native-flash-message';
import {put, call} from 'redux-saga/effects';
import {bookingListAPI, bookServiceAPI} from './../../../services/api';
import {
  BOOK_SERVICE_SUCCESS,
  FETCH_BOOKINGS_SUCCESS,
} from '../../reduxConstants';
import EStyleSheet from 'react-native-extended-stylesheet';
import {navigate, navReset} from '../../../navigation/RootNavigation';

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

export function* bookingServiceWorker({payload}) {
  try {
    const {data} = yield call(bookServiceAPI, payload);
    yield put({
      type: BOOK_SERVICE_SUCCESS,
      payload: data,
    });
    console.log('data', data)
  } catch (error) {
    if (error.response.status === 402) {
      showMessage({
        message: error.response.data.response.response_message,
        type: 'info',
        backgroundColor: EStyleSheet.value('$WARNING_RED'),
      });

      Promise.all([navReset('DashboardNavigation')])
        .then(() =>
          navigate('DashboardNavigation', {
            screen: 'SettingsStack',
          }),
        )
        .then(() =>
          navigate('SettingsStack', {
            screen: 'Wallet',
          }),
        );
    } else {
      showMessage({
        message: error.response.data.response.response_message,
        type: 'info',
        backgroundColor: EStyleSheet.value('$WARNING_RED'),
      });
    }
  }
}
