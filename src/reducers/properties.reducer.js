import * as types from './../constants/actionTypes';

export default (state = [], action) => {
    switch (action.type) {
        case types.LOAD_PROPERTIES_REQUEST:
            return state;
        case types.LOAD_PROPERTIES_SUCCESS:
            return state;
        case types.LOAD_PROPERTIES_FAIL:
            return state;
        default:
            return state;
    }
};