import {CREATE_ORDER, VERIFY_PAYMENT, WALLET_RESET} from "../reduxConstants";

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

