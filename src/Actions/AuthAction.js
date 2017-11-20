import axios from 'axios';
import { AsyncStorage } from 'react-native';
import * as types from './../constants/actionTypes';
import * as config from './../constants/config';
import { favoritePropertiesLoadSuccess } from './PropertiesAction';

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
        AsyncStorage.setItem(config.USER_DATA, JSON.stringify(response.data));
        dispatch(authSuccess(response.data));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
  };
}

export function register(data) {
  return (dispatch) => {
    dispatch(authRequest());
    return axios
      .post(`${config.PUBLIC_URL}register`, data)
      .then((response) => {
        AsyncStorage.setItem(config.USER_DATA, JSON.stringify(response.data));
        const userData = {
          id: response.data.id,
          type: response.data.type,
          email: data.email,
          name: data.name,
          image: data.imageUrl,
        };
        dispatch(authSuccess(userData));
      })
      .catch((error) => {
        dispatch(authFail(error));
      });
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
