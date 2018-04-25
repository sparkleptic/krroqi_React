import axios from 'axios';
import { AsyncStorage } from 'react-native';
import * as types from './../constants/actionTypes';
import * as config from './../constants/config';

let  lang = 'en';

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

export function favoritePropertiesLoadRequest() {
  return { type: types.LOAD_FAVORITE_PROPERTIES_REQUEST };
}

export function favoritePropertiesLoadSuccess(properties) {
  return { type: types.LOAD_FAVORITE_PROPERTIES_SUCCESS, properties };
}

export function favoritePropertiesLoadFail(error) {
  return { type: types.LOAD_FAVORITE_PROPERTIES_FAIL, error };
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

export function saveSearchRequest() {
  return { type: types.SAVED_SEARCH_REQUEST };
}

export function saveSearchSuccess(search) {
  return { type: types.SAVED_SEARCH_SUCCESS, search };
}

export function saveSearchFail(error) {
  return { type: types.SAVED_SEARCH_FAIL, error };
}

export function likePropertyRequest() {
  return { type: types.LIKE_PROPERTY_REQUEST };
}

export function likePropertySuccess(data) {
  return { type: types.LIKE_PROPERTY_SUCCESS, data };
}

export function likePropertyFail(error) {
  return { type: types.LIKE_PROPERTY_FAIL, error };
}

export function propertiesLoad() {
  return (dispatch) => {
    AsyncStorage.getItem('lang').then((value) => {
      if(value == null){
        lang = 'en';
      }else{
        lang = value;
      }
      dispatch(propertiesLoadRequest());
      return axios
        .get(`${config.PUBLIC_URL}getProperties/${lang}`)
        .then((response) => {
          dispatch(propertiesLoadSuccess(response.data));
        })
        .catch((error) => {
          dispatch(propertiesLoadFail(error));
        });
    }).done();
  };
}

export function propertiesByCategoryLoad(category) {
  return (dispatch) => {
    AsyncStorage.getItem('lang').then((value) => {
      if(value == null){
        lang = 'en';
      }else{
        lang = value;
      }
      dispatch(propertiesByCategoryLoadRequest());
      return axios
        .get(`${config.PUBLIC_URL}getCategoryProperties/${lang}/${category}`)
        .then((response) => {
          dispatch(propertiesByCategoryLoadSuccess(response.data));
        })
        .catch((error) => {
          dispatch(propertiesByCategoryLoadFail(error));
        });
    }).done();
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
  var sortBy = 'Relevance';
  var sortOrder = 'DESC';

  if (search !== undefined && search !== null) {
    sortBy = search.sortBy;
    sortOrder = search.sortOrder;
  }
  return (dispatch) => {
    AsyncStorage.getItem('lang').then((value) => {
      if(value == null){
        lang = 'en';
      }else{
        lang = value;
      }
      dispatch(filteredPropertiesLoadRequest());
      return axios
        .get(`${config.PUBLIC_URL}get30Properties/${lang}?sortBy=${sortBy}&sortOrder=${sortOrder}`)
        .then((response) => {
          dispatch(filteredPropertiesLoadSuccess(response.data));
          const newSearch = search || config.search;
          dispatch(searchChange(newSearch));
        })
        .catch((error) => {
          dispatch(filteredPropertiesLoadFail(error));
        });
    }).done();
  };
}

export function filteredPropertiesLoadOnSearch(search) {
  return (dispatch) => {
    AsyncStorage.getItem('lang').then((value) => {
      if(value == null){
        lang = 'en';
      }else{
        lang = value;
      }
      dispatch(filteredPropertiesLoadRequest());      
      let filterData = {"filter": search};      
      return axios
        .post(`${config.PUBLIC_URL}filterProperties/${lang}`, filterData)
        .then((response) => {
          dispatch(filteredPropertiesLoadSuccess(response.data));
          const newSearch = search || config.search;
          dispatch(searchChange(newSearch));
        })
        .catch((error) => {
          dispatch(filteredPropertiesLoadFail(error));
        });
    }).done();
  };
}

export function favoritePropertiesLoad(userId) {
  return (dispatch) => {
    AsyncStorage.getItem('lang').then((value) => {
      if(value == null){
        lang = 'en';
      }else{
        lang = value;
      }
      dispatch(favoritePropertiesLoadRequest());
      return axios
        .get(`${config.PUBLIC_URL}getUserFavouriteProperty/${userId}/${lang}`)
        .then((response) => {
          dispatch(favoritePropertiesLoadSuccess(response.data));
        })
        .catch((error) => {
          dispatch(favoritePropertiesLoadFail(error));
        });
    }).done();
  };
}

export function checkConnection(isConnected) {
  return (dispatch) => {
    dispatch(checkConnectionSuccess(isConnected));
  };
}

export function savedSearchLoad() {
  return (dispatch) => {
    dispatch(saveSearchRequest());
    return AsyncStorage.getItem('savedSearch')
      .then((value) => {
        const newValue = value || [];
        dispatch(saveSearchSuccess(JSON.parse(newValue)));
      })
      .catch((error) => {
        dispatch(saveSearchFail(error));
      });
  };
}

export function likeProperty(data) {
  return (dispatch) => {
    dispatch(likePropertyRequest());
    return axios
      .post(`${config.PUBLIC_URL}saveUserFavouriteProperty`, data)
      .then((response) => {
        dispatch(likePropertySuccess(response.data));
      })
      .catch((error) => {
        dispatch(likePropertyFail(error));
      });
  };
}
