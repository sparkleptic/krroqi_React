import axios from 'axios';
import * as types from './../constants/actionTypes';
import * as config from './../constants/config';


export function propertiesLoadRequest() {
    return { type: types.LOAD_PROPERTIES_REQUEST };
}

export function propertiesLoadSuccess(properties) {
    return { type: types.LOAD_PROPERTIES_SUCCESS, properties };
}

export function propertiesLoadFail(error) {
    return { type: types.LOAD_PROPERTIES_FAIL, error };
}

export function checkConnectionSuccess(isConnected) {
    return { type: types.CHECK_CONNECTION, isConnected };
}

export function propertiesLoad() {
    return (dispatch) => {
        dispatch(propertiesLoadRequest());
        return axios.get(`${config.PUBLIC_URL}getProperties/en`).then((response) => {
            dispatch(propertiesLoadSuccess(response.data));
        }).catch((error) => {
            dispatch(propertiesLoadFail(error));
        });
    };
}

export function checkConnection(isConnected) {
    return (dispatch) => {
        dispatch(checkConnectionSuccess(isConnected));
    }
}