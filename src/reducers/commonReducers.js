// search change

const UPDATE_SEARCH = "UPDATE_SEARCH";

import initialState from './initialState';

export default (state = initialState.mapsearch, action) => {
    switch (action.type) {
        case UPDATE_SEARCH:
            return {
                ...state,
                searchText: action.data.searchText,
                latitude: action.data.latitude,
                longitude: action.data.longitude,
                latitudeDelta: action.data.latitudeDelta,
                longitudeDelta: action.data.longitudeDelta,
            }
            break;
        default:
            return state;
    }
};