import initialState from './initialState';
import { SEARCH_CHANGE } from '../constants/actionTypes';

export default (state = initialState.search, action) => {
  switch (action.type) {
    case SEARCH_CHANGE:
      return action.search;
    default:
      return state;
  }
};
