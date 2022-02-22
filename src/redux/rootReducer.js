import { combineReducers } from 'redux'
import bookingListReducer from '../redux/bookingList/reducer';
import reducer from './reducers/auth'
import { persistReducer } from 'redux-persist';


const rootReducer= combineReducers({
 reducer,
  bookingListReducer ,

});
export default rootReducer;
