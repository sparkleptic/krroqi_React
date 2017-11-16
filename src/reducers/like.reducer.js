import * as types from './../constants/actionTypes';
import initialState from './initialState';

export default (state = initialState.common, action) => {
  switch (action.type) {
    case types.LIKE_PROPERTY_REQUEST:
      return { ...state, loading: true };
    case types.LIKE_PROPERTY_SUCCESS:
      return { ...state, loading: false, success: action.data };
    case types.LIKE_PROPERTY_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
