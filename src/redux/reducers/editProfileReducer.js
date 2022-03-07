import {
  FETCH_CITY_SUCCESS,
  FETCH_STATE_SUCCESS,
  RESET_PROFILE_UPDATE_STATE,
  UPDATE_PROFILE,
  UPDATE_PROFILE_FAILED,
  UPDATE_PROFILE_SUCCESS,
} from '../reduxConstants';

const initialState = {
  statesList: [],
  cityList: [],
  isUpdating: false,
  profileUpdateSuccess: false,
  error: '',
};

const reducer = (state = initialState, action) => {
  const newState = {...state};

  switch (action.type) {
    case FETCH_STATE_SUCCESS:
      return {
        ...state,
        statesList: action.payload.data,
      };

    case FETCH_CITY_SUCCESS:
      return {
        ...state,
        cityList: action.payload.data,
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        isUpdating: true,
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        profileUpdateSuccess: true,
      };

    case UPDATE_PROFILE_FAILED:
      return {
        ...state,
        error: action.payload.message,
        isUpdating: false,
      };

    case RESET_PROFILE_UPDATE_STATE:
      return {
        ...state,
        profileUpdateSuccess: false,
      };

    default:
      return newState;
  }
};

export default reducer;
