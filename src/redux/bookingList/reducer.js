import {
    
    RECEIVE_BOOKINGLIST_DATA,
} from '../bookingList/contants'

const initialState = {
    listData:[],
   
};

const bookingListReducer = (state = initialState, action) => {
    const newState = { ...state };
      
    switch (action.type) {

         case RECEIVE_BOOKINGLIST_DATA:
                return {
                    ...state,
                listData: action.listData,
                };
                
    }
    return newState
};

export default bookingListReducer;
