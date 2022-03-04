import {combineReducers} from 'redux';
import reducer from './reducers/auth';
import editProfileReducer from './reducers/editProfileReducer';

export default combineReducers({
  auth: reducer,
  editProfileReducer,
});
