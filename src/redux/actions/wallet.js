import {CREATE_ORDER, FETCH_WALLET_DETAILS, VERIFY_PAYMENT, WALLET_RESET} from "../reduxConstants";

export const createOrderAction = (payload) => ({
  type: CREATE_ORDER,
  payload,
});

export const walletResetAction = () => ({
  type: WALLET_RESET,
});

export const verifyPaymentAction = (payload) => ({
  type: VERIFY_PAYMENT,
  payload,
});

export const walletDetailsAction = () => ({
  type: FETCH_WALLET_DETAILS,
});


