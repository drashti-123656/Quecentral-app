import {
  CREATE_ORDER,
  CREATE_ORDER_FAILED,
  CREATE_ORDER_SUCCESS,
  RESET,
  WALLET_RESET,
} from '../reduxConstants';

const initialState = {
  walletData: {},
  isFetchingWalletData: false,
  creatingOrder: true,
  viewCheckoutModal: false,
  orderDetails: {},
  error: '',
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return {
        ...state,
        creatingOrder: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        creatingOrder: false,
        viewCheckoutModal: true,
        orderDetails: action.payload,
      };
    case CREATE_ORDER_FAILED:
      return {
        ...state,
        creatingOrder: false,
        error: action.payload,
      };

    case WALLET_RESET:
      return {
        walletData: {},
        isFetchingWalletData: false,
        creatingOrder: true,
        viewCheckoutModal: false,
        orderDetails: {},
        error: '',
      };

    default:
      return state;
  }
};

export default walletReducer;
