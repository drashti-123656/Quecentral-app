import {combineReducers} from 'redux';
import reducer from './reducers/auth';
import editProfileReducer from './reducers/editProfileReducer';
import bookingsReducer from './reducers/bookingsReducer';
import app from './reducers/app';
import searchServices from './reducers/searchServices';
import serviceDetails from './reducers/serviceDetails';

const rootReducer = combineReducers({
  app,
  auth: reducer,
  editProfileReducer,
  bookingsReducer,
  searchServices,
  serviceDetails
});

export default rootReducer;
