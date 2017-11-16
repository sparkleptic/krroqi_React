import * as types from './../constants/actionTypes';
import initialState from './initialState';

export default (state = initialState.common, action) => {
  switch (action.type) {
    case types.AUTH_REQUEST:
      return { ...state, loading: true };
    case types.AUTH_SUCCESS:
      return { ...state, loading: false, success: action.user };
    case types.AUTH_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
