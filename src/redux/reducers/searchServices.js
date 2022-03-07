import {FETCH_SERVICES, FETCH_SERVICES_SUCCESS} from '../reduxConstants';

const initialState = {
  services: [],
  isFetching: false,
  error: '',
};

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SERVICES:
      return {
        ...state,
        isFetching: true,
      };

    case FETCH_SERVICES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        services: action.payload.data,
      };

    default:
      return state;
  }
};

export default bookingsReducer;
