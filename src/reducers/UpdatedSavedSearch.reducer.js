const UPDATE_SAVE_SEARCH = "UPDATE_SAVE_SEARCH";

import initialState from './initialState';

export default (state = initialState.savedSearchData, action) => {
    switch (action.type) {
        case UPDATE_SAVE_SEARCH:
            return action.data
            break;
        default:
            return state;
    }
};