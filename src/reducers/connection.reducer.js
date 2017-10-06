import * as types from './../constants/actionTypes';

export default (state = { isConnected: false }, action) => {
    switch (action.type) {
        case types.CHECK_CONNECTION:
            return { ...state, isConnected: action.isConnected };
        default:
            return state;
    }
};