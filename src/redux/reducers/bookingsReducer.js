import {
  BOOK_SERVICE,
  BOOK_SERVICE_SUCCESS,
  FETCH_BOOKINGS,
  FETCH_BOOKINGS_SUCCESS,
  RESET_BOOKING,
} from '../reduxConstants';

const initialState = {
  bookingsList: [],
  isFetching: false,
  profileUpdateSuccess: false,
  isBooking: false,
  bookingSuccess: false,
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

    case BOOK_SERVICE:
      return {
        ...state,
        isBooking: true,
      };

    case BOOK_SERVICE_SUCCESS:
      return {
        ...state,
        isBooking: false,
        bookingSuccess: true,
      };

    case RESET_BOOKING:
      return {
        ...state,
        isBooking: false,
        bookingSuccess: false,
      };

    default:
      return state;
  }
};

export default bookingsReducer;
