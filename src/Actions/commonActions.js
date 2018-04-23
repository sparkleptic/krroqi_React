// search change

const UPDATE_SEARCH = "UPDATE_SEARCH";
const UPDATE_SAVE_SEARCH = "UPDATE_SAVE_SEARCH";

export function updateSearch(search) {
    return {
        type: UPDATE_SEARCH,
        data: search,
    }
}

export function updateSaveSearch(params) {
    return {
        type: UPDATE_SAVE_SEARCH,
        data: params
    }
}