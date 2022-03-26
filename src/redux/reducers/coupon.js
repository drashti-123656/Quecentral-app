import FETCH_COUPON_DETAILS, { FETCH_COUPON_SUCCESS } from '../reduxConstants';

const initialState = {
  isFetching: false,
  couponData: [],

};
const coupon = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUPON_DETAILS:

      return {
        ...state,
        data: action.type.data,
        isFetching: true,
      };
    case FETCH_COUPON_SUCCESS:
      return {
        ...state,
        couponData: action.payload,
        isFetching: false,
      }

    default:
      return state;
  }
};
export default coupon;
