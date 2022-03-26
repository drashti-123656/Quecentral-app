import FETCH_COUPON_DETAILS, { FETCH_COUPON_SUCCESS } from '../reduxConstants';

const initialState = {

  couponData: [],

};

const coupon = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUPON_DETAILS:

      return {
        ...state,
        data: action.type.data,

      };
    case FETCH_COUPON_SUCCESS:
      console.log('action.payload===>', action.payload);
      return {
        ...state,
        couponData: action.payload,
      }

    default:
      return state;
  }
};
export default coupon;
