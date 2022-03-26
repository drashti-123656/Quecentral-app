import {FETCH_COUPON_DETAILS} from '../reduxConstants';

export const couponAction = (payload) => ({
  type: FETCH_COUPON_DETAILS,
  payload,
});
