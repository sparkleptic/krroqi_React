import axios from 'axios';
import * as config from './../constants/config';

const LOADING_FEATURE = 'LOADING_FEATURE'
const LOAD_SUCCESS_FEATURE = 'LOAD_SUCCESS_FEATURE'
const LOAD_FAIL_FEATURE = 'LOAD_FAIL_FEATURE'

export function loadFeaturesRequest() {
  return { type: LOADING_FEATURE };
}

export function loadFeaturesSuccess(feature) {
  return { type: LOAD_SUCCESS_FEATURE, 
           data: feature 
         };
}

export function loadFeaturesFail(error) {
  return { type: LOAD_FAIL_FEATURE, 
           data: error 
         };
}

export function loadFeatures() {
  return (dispatch) => {
    dispatch(loadFeaturesRequest());
    return axios
      .get(`${config.PUBLIC_URL}getFeatures`)
      .then((response) => {
        var objArr = new Array();
        response.data.map( (dir, i) => {
          // let o = Object.assign({}, dir);
          // o.isChecked = false;
          let obj_1 = {...dir}
          obj_1.isChecked = false;
          objArr.push(obj_1)
        })
        dispatch(loadFeaturesSuccess(objArr));
      })
      .catch((error) => {
        dispatch(loadFeaturesFail(error));
      });
  };
}