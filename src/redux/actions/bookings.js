import {BOOK_SERVICE, FETCH_BOOKINGS, RESET_BOOKING} from "../reduxConstants";

export const fetchBookingsAction = (payload) => ({
  type: FETCH_BOOKINGS,
  payload,
});

export const bookServiceAction = (payload) => ({
  type: BOOK_SERVICE,
  payload,
});

export const bookResetAction = () => ({
  type: RESET_BOOKING,
});
