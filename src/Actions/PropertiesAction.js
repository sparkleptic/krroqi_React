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
  return { type: types.LOAD_FILTERED_PROPERTIES_REQUEST };
}

export function filteredPropertiesLoadSuccess(properties) {
  return { type: types.LOAD_FILTERED_PROPERTIES_SUCCESS, properties };
}

export function filteredPropertiesLoadFail(error) {
  return { type: types.LOAD_FILTERED_PROPERTIES_FAIL, error };
}

export function propertiesByCategoryLoadRequest() {
  return { type: types.LOAD_PROPERTIES_CATEGORY_REQUEST };
}

export function propertiesByCategoryLoadSuccess(properties) {
  return { type: types.LOAD_PROPERTIES_CATEGORY_SUCCESS, properties };
}

export function propertiesByCategoryLoadFail(error) {
  return { type: types.LOAD_PROPERTIES_CATEGORY_FAIL, error };
}

export function propertyStatusLoadRequest() {
  return { type: types.LOAD_PROPERTY_STATUS_REQUEST };
}

export function propertyStatusLoadSuccess(properties) {
  return { type: types.LOAD_PROPERTY_STATUS_SUCCESS, properties };
}

export function propertyStatusLoadFail(error) {
  return { type: types.LOAD_PROPERTY_STATUS_FAIL, error };
}

export function propertyTypesLoadRequest() {
  return { type: types.LOAD_PROPERTY_TYPES_REQUEST };
}

export function propertyTypesLoadSuccess(properties) {
  return { type: types.LOAD_PROPERTY_TYPES_SUCCESS, properties };
}

export function propertyTypesLoadFail(error) {
  return { type: types.LOAD_PROPERTY_TYPES_FAIL, error };
}

export function checkConnectionSuccess(isConnected) {
  return { type: types.CHECK_CONNECTION, isConnected };
}

export function searchChange(search) {
  return { type: types.SEARCH_CHANGE, search };
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

export function propertyStatusLoad() {
  return (dispatch) => {
    dispatch(propertyStatusLoadRequest());
    return axios
      .get(`${config.PUBLIC_URL}getStatuses`)
      .then((response) => {
        dispatch(propertyStatusLoadSuccess(response.data));
      })
      .catch((error) => {
        dispatch(propertyStatusLoadFail(error));
      });
  };
}

export function propertyTypesLoad() {
  return (dispatch) => {
    dispatch(propertyTypesLoadRequest());
    return axios
      .get(`${config.PUBLIC_URL}getTypes`)
      .then((response) => {
        dispatch(propertyTypesLoadSuccess(response.data));
      })
      .catch((error) => {
        dispatch(propertyTypesLoadFail(error));
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
        dispatch(searchChange(search));
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
