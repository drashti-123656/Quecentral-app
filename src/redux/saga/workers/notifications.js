import {showMessage} from 'react-native-flash-message';
import {put, call} from 'redux-saga/effects';
import {notificationListAPI} from './../../../services/api';
import {
  FETCH_NOTIFICATIONS_FAILED,
  FETCH_NOTIFICATIONS_SUCCESS,
} from '../../reduxConstants';
import EStyleSheet from 'react-native-extended-stylesheet';

export function* notificationsWorker() {
  try {
    const {data} = yield call(notificationListAPI);
    yield put({
      type: FETCH_NOTIFICATIONS_SUCCESS,
      payload: data.data.notification_list,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: FETCH_NOTIFICATIONS_FAILED,
      payload: error.response.data.response.response_message,
    });
    showMessage({
      message: error.response.data.response.response_message,
      type: 'info',
      backgroundColor: EStyleSheet.value('$WARNING_RED'),
    });
  }
}
