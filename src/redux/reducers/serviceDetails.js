import {
  FETCH_SERVICE_DETAILS,
  FETCH_SERVICE_DETAILS_FAILED,
  FETCH_SERVICE_DETAILS_SUCCESS,
} from '../reduxConstants';

const initialState = {
  serviceOverview: [],
  sellerOverview: {},
  availableDays: [],
  reviews: [],
  isFetching: false,
  error: '',
};

const serviceDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SERVICE_DETAILS:
      return {
        ...state,
        isFetching: true,
      };

    case FETCH_SERVICE_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        serviceOverview: action.payload.data.service_overview,
        sellerOverview: action.payload.data.seller_overview,
        availableDays: action.payload.data.availability_days,
        reviews: action.payload.data.reviews,
        bookingsList: action.payload.data,
      };

      case FETCH_SERVICE_DETAILS_FAILED:
        return {
          ...state,
          isFetching: false,
          error: action.payload,
        };

    default:
      return state;
  }
};

export default serviceDetailsReducer;
