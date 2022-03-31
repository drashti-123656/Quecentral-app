import {takeLatest} from 'redux-saga/effects';
import {FETCH_NOTIFICATIONS} from '../../reduxConstants';
import {notificationsWorker} from '../workers/notifications';

export function* watchNotifications() {
  yield takeLatest(FETCH_NOTIFICATIONS, notificationsWorker);
}
