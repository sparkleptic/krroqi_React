import initialState from './initialState';
import * as types from './../constants/actionTypes';

export default (state = initialState.properties, action) => {
  switch (action.type) {
    case types.LOAD_PROPERTYTYPES_REQUEST:
      return { ...state, loading: true };
    case types.LOAD_PROPERTYTYPES_SUCCESS:
      return { ...state, loading: false, success: action.properties };
    case types.LOAD_PROPERTYTYPES_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
