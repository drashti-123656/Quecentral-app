import {combineReducers} from 'redux';
import reducer from './reducers/auth';
import editProfileReducer from './reducers/editProfileReducer';
import bookingsReducer from './reducers/bookingsReducer';
import searchServices from './reducers/searchServices';

const rootReducer = combineReducers({
  auth: reducer,
  editProfileReducer,
  bookingsReducer,
  searchServices,
});

export default rootReducer;
