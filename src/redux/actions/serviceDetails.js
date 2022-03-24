import {FETCH_SERVICE_DETAILS} from '../reduxConstants';

export const serviceDetailsAction = payload => ({
  type: FETCH_SERVICE_DETAILS,
  payload,
});
