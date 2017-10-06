import * as types from './../constants/actionTypes';

export default (state = false, action) => {
    switch (action.type) {
        case types.CHECK_CONNECTION:
            return action.isConnected;
        default:
            return state;
    }
};