import { createStore, combineReducers, applyMiddleware} from 'redux'
// import reducer from './reducers/auth'
import rootReducer from './rootReducer'
// const reducer = combineReducers(reducer)

const initialState = {
    listData:[],
    authData: { isLoggedIn: false, token: null },
    userData: { OTPVerification: false },
};


const store = createStore(rootReducer)

export default store 