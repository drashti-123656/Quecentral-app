import {FETCH_CITY, FETCH_STATE, RESET_PROFILE_UPDATE_STATE, UPDATE_PROFILE} from "../reduxConstants";

export const fetchStateAction = (payload) => ({
  type: FETCH_STATE,
  payload,
});

export const fetchCityAction = (payload) => ({
  type: FETCH_CITY,
  payload,
});

export const updateProfileAction = (payload) => ({
  type: UPDATE_PROFILE,
  payload,
});

export const resetProfileStateAction = () => ({
  type: RESET_PROFILE_UPDATE_STATE
});