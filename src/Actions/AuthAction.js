import axios from 'axios';
import { AsyncStorage } from 'react-native';
import * as types from './../constants/actionTypes';
import * as config from './../constants/config';
import { favoritePropertiesLoadSuccess } from './PropertiesAction';

export function authReset() {
  return { type: types.AUTH_RESET };
}

export function authRequest() {
  return { type: types.AUTH_REQUEST };
}

export function authSuccess(user) {
  return { type: types.AUTH_SUCCESS, user };
}

export function authFail(error) {
  return { type: types.AUTH_FAIL, error };
}

export function checkUserExist() {
  return (dispatch) => {
    dispatch(authRequest());
    return AsyncStorage.getItem(config.USER_DATA)
      .then((value) => {
        dispatch(authSuccess(JSON.parse(value)));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
}

export function login(data) {
  return (dispatch) => {
    dispatch(authRequest());
    return axios
      .post(`${config.PUBLIC_URL}checkUser`, data)
      .then((response) => {
        if(response.data.id === 0) {
          dispatch(authFail(error));
        }else{
          AsyncStorage.setItem(config.USER_DATA, JSON.stringify(response.data));
          dispatch(authSuccess(response.data));
        }
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
}

export function register(data) {
  let lang = 'en'
  return (dispatch) => {
    AsyncStorage.getItem('lang').then((value) => {
      if(value == null){
        lang = 'en';
      }else{
        lang = value;
      }
      dispatch(authRequest());
      return axios      
        .post(`${config.PUBLIC_URL}register`, {...data, lang})
        .then((response) => {
          const userData = {
            id: response.data.id,
            type: response.data.type,
            is_new: response.data.is_new,
            email: data.email,
            name: data.name,
            image: data.imageUrl,
          };

      AsyncStorage.setItem(config.USER_DATA, JSON.stringify(userData));        
        dispatch(authSuccess(userData));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
    }).done();
  };
}
export function logout() {
  return (dispatch) => {
    dispatch(authRequest());
    return AsyncStorage.removeItem(config.USER_DATA)
      .then(() => {
        dispatch(authSuccess(false));
        dispatch(favoritePropertiesLoadSuccess(false));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
}
