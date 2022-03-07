import {FETCH_SERVICES} from '../reduxConstants';

export const searchServiceAction = payload => ({
  type: FETCH_SERVICES,
  payload,
});
