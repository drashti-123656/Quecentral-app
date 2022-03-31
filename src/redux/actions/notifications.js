import {FETCH_NOTIFICATIONS} from '../reduxConstants';

export const fetchNotificationsAction = payload => ({
  type: FETCH_NOTIFICATIONS,
  payload,
});
