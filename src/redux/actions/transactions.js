import {FETCH_TRANSACTIONS} from "../reduxConstants";

export const fetchTransactionsAction = (payload) => ({
  type: FETCH_TRANSACTIONS,
  payload,
});
