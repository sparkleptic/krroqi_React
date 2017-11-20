import * as types from './../constants/actionTypes';
import initialState from './initialState';

export default (state = initialState.common, action) => {
  switch (action.type) {
    case types.LOAD_AGENT_REQUEST:
      return { ...state, loading: true };
    case types.LOAD_AGENT_SUCCESS:
      return { ...state, loading: false, success: action.agent };
    case types.LOAD_AGENT_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
