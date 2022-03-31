import {
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_FAILED,
  FETCH_NOTIFICATIONS_SUCCESS,
} from '../reduxConstants';

const initialState = {
  isFetching: false,
  notifications: [],
  error: false,
  errorMessage: '',
};
const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
        isFetching: false,
      };

    case FETCH_NOTIFICATIONS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
export default notificationsReducer;
