// search change

const UPDATE_SEARCH = "UPDATE_SEARCH";

export function updateSearch(search) {
    return {
        type: UPDATE_SEARCH,
        data: search,
    }
}