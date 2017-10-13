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

export function filteredPropertiesLoadRequest() {
  return { type: types.LOAD_FILTEREDPROPERTIES_REQUEST };
}

export function filteredPropertiesLoadSuccess(properties) {
  return { type: types.LOAD_FILTEREDPROPERTIES_SUCCESS, properties };
}

export function filteredPropertiesLoadFail(error) {
  return { type: types.LOAD_FILTEREDPROPERTIES_FAIL, error };
}

export function propertiesByCategoryLoadRequest() {
  return { type: types.LOAD_PROPERTIESBYCATEGORY_REQUEST };
}

export function propertiesByCategoryLoadSuccess(properties) {
  return { type: types.LOAD_PROPERTIESBYCATEGORY_SUCCESS, properties };
}

export function propertiesByCategoryLoadFail(error) {
  return { type: types.LOAD_PROPERTIESBYCATEGORY_FAIL, error };
}

export function checkConnectionSuccess(isConnected) {
  return { type: types.CHECK_CONNECTION, isConnected };
}

export function propertiesLoad() {
  return (dispatch) => {
    dispatch(propertiesLoadRequest());
    return axios
      .get(`${config.PUBLIC_URL}getProperties/en`)
      .then((response) => {
        dispatch(propertiesLoadSuccess(response.data));
      })
      .catch((error) => {
        dispatch(propertiesLoadFail(error));
      });
  };
}

export function propertiesByCategoryLoad(category) {
  return (dispatch) => {
    dispatch(propertiesByCategoryLoadRequest());
    return axios
      .get(`${config.PUBLIC_URL}getCategoryProperties/en/${category}`)
      .then((response) => {
        dispatch(propertiesByCategoryLoadSuccess(response.data));
      })
      .catch((error) => {
        dispatch(propertiesByCategoryLoadFail(error));
      });
  };
}

export function filteredPropertiesLoad(search) {
  return (dispatch) => {
    dispatch(filteredPropertiesLoadRequest());
    return axios
      .get(`${config.PUBLIC_URL}get30Properties/en`)
      .then((response) => {
        dispatch(filteredPropertiesLoadSuccess(response.data));
      })
      .catch((error) => {
        dispatch(filteredPropertiesLoadFail(error));
      });
  };
}

export function checkConnection(isConnected) {
  return (dispatch) => {
    dispatch(checkConnectionSuccess(isConnected));
  };
}
