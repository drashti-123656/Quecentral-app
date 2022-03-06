import {FETCH_BOOKINGS, FETCH_BOOKINGS_SUCCESS} from '../reduxConstants';

const initialState = {
  bookingsList: [],
  isFetching: false,
  profileUpdateSuccess: false,
  error: '',
};

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKINGS:
      return {
        ...state,
        isFetching: true,
      };

    case FETCH_BOOKINGS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        bookingsList: action.payload.data,
      };

    default:
      return state;
  }
};

export default bookingsReducer;
