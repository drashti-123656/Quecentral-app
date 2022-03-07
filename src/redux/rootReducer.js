import {combineReducers} from 'redux';
import reducer from './reducers/auth';
import editProfileReducer from './reducers/editProfileReducer';
import bookingsReducer from './reducers/bookingsReducer';

const rootReducer = combineReducers({
  auth: reducer,
  editProfileReducer,
  bookingsReducer,
});

export default rootReducer;
