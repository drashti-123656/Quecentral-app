import {
  CREATE_ORDER,
  CREATE_ORDER_FAILED,
  CREATE_ORDER_SUCCESS,
  FETCH_WALLET_DETAILS,
  FETCH_WALLET_DETAILS_SUCCESS,
  VERIFY_PAYMENT,
  VERIFY_PAYMENT_FAILED,
  VERIFY_PAYMENT_SUCCESS,
  WALLET_RESET,
} from '../reduxConstants';

const initialState = {
  walletData: {},
  isFetchingWalletData: false,
  isCreatingOrder: false,
  isVerifyingPayment: false,
  orderDetails: {},
  error: '',
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WALLET_DETAILS:
      return {
        ...state,
        isFetchingWalletData: true,
      };

    case FETCH_WALLET_DETAILS_SUCCESS:
      return {
        ...state,
        walletData: action.payload,
        isFetchingWalletData: false,
      };

    case CREATE_ORDER:
      return {
        ...state,
        isCreatingOrder: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isCreatingOrder: false,
        viewCheckoutModal: true,
        orderDetails: action.payload,
      };
    case CREATE_ORDER_FAILED:
      return {
        ...state,
        isCreatingOrder: false,
        error: action.payload,
      };

    case VERIFY_PAYMENT:
      return {
        ...state,
        isVerifyingPayment: true,
      };

    case VERIFY_PAYMENT_SUCCESS:
      return {
        ...state,
        isVerifyingPayment: false,
      };

    case VERIFY_PAYMENT_FAILED:
      return {
        ...state,
        isVerifyingPayment: false,
      };

    case WALLET_RESET:
      return {
        walletData: {},
        isFetchingWalletData: false,
        isCreatingOrder: false,
        orderDetails: {},
        isVerifyingPayment: false,
        error: '',
      };

    default:
      return state;
  }
};

export default walletReducer;
