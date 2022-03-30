import {
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTIONS_SUCCESS,
} from '../reduxConstants';

const initialState = {
  transactions: [],
  isFetching: false,
  error: '',
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRANSACTIONS:
      return {
        ...state,
        isFetching: true,
      };

    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        transactions: action.payload,
      };

    default:
      return state;
  }
};

export default transactionReducer;
