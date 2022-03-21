import {TOGGLE_THEME} from '../reduxConstants';

const initialState = {
  theme: 'light',
};

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    default:
      return state;
  }
};

export default bookingsReducer;
