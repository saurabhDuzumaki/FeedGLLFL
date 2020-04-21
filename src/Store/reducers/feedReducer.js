import * as actionTypes from '../actions/actionTypes';

const initialState = {
  allFeeds: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_FEED:
    case actionTypes.ADD_FEED:
      return {...state, allFeeds: action.payload.allFeeds};
    default:
      return state;
  }
};
