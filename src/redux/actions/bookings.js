import {FETCH_BOOKINGS} from "../reduxConstants";

export const fetchBookingsAction = (payload) => ({
  type: FETCH_BOOKINGS,
  payload,
});