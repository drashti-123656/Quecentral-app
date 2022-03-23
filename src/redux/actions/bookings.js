import {BOOK_SERVICE, FETCH_BOOKINGS} from "../reduxConstants";

export const fetchBookingsAction = (payload) => ({
  type: FETCH_BOOKINGS,
  payload,
});

export const bookServiceAction = (payload) => ({
  type: BOOK_SERVICE,
  payload,
});