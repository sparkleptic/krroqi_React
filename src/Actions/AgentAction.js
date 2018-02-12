import axios from 'axios';
import * as types from './../constants/actionTypes';
import * as config from './../constants/config';

export function loadAgentRequest() {
  return { type: types.LOAD_AGENT_REQUEST };
}

export function loadAgentSuccess(agent) {
  return { type: types.LOAD_AGENT_SUCCESS, agent };
}

export function loadAgentFail(error) {
  return { type: types.LOAD_AGENT_FAIL, error };
}

export function loadAgent(data) {
  return (dispatch) => {
    dispatch(loadAgentRequest());
    return axios
      .post(`${config.PUBLIC_URL}fetchAgents`, data)
      .then((response) => {
        dispatch(loadAgentSuccess(response.data));
      })
      .catch((error) => {
        dispatch(loadAgentFail(error));
      });
  };
}