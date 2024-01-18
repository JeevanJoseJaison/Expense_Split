// reducers.js
import { combineReducers } from 'redux';

// Reducer for userName
const userNameReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return action.payload;
    default:
      return state;
  }
};

// Reducer for owes
const owesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_OWES':
      return action.payload;
    default:
      return state;
  }
};

const individualReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_INDIVIDUAL':
        return action.payload;
      default:
        return state;
    }
  };
  const historyReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_HISTORY':
        return action.payload;
      default:
        return state;
    }
  };
  const detailReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_DETAIL':
        return action.payload;
      default:
        return state;
    }
  };


// Combine reducers
const rootReducer = combineReducers({
  userName: userNameReducer,
  owes: owesReducer,
  individual : individualReducer,
  history : historyReducer ,
  detail : detailReducer
});

export default rootReducer;
