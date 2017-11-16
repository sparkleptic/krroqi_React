import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default (state = initialState.common, action) => {
  switch (action.type) {
    case types.SAVED_SEARCH_REQUEST:
      return { ...state, loading: true };
    case types.SAVED_SEARCH_SUCCESS:
      return { ...state, loading: false, success: action.search };
    case types.SAVED_SEARCH_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
