/**
 * Created by user on 17.07.17.
 */

import * as apiService from '../../api/apiService';
import * as actionsRoute from './actionsRoute';
import AsyncStorageHelper from '../../asyncstore/AsyncStorageHelper';

export const SET_USERNAME = 'SET_USERNAME';
export const SET_AUTH_REQUEST_IN_PROGRESS = 'SET_AUTH_REQUEST_IN_PROGRESS';
export const SET_AUTH_RESULT = 'SET_AUTH_RESULT';
export const SET_TOKEN = 'SET_TOKEN';

export function setToken(data) {
  return {
    type: SET_TOKEN,
    data,
  };
}

export function setUsername(data) {
  return {
    type: SET_USERNAME,
    data,
  };
}

export function setAuthRequestInProgress(data) {
  return {
    type: SET_AUTH_REQUEST_IN_PROGRESS,
    data,
  };
}

export function setAuthResult(data) {
  return {
    type: SET_AUTH_RESULT,
    data,
  };
}

export const logout = () => (dispatch) => {
  dispatch(setUsername(null));
  dispatch(setAuthResult(null));
};

export const login = data => (dispatch) => {
  dispatch(setAuthResult(null));
  const { username, password } = data;
  if (!username) {
    dispatch(setAuthResult('Please, input username'));
    return;
  }
  if (!password) {
    dispatch(setAuthResult('Please, input password'));
    return;
  }
  dispatch(setAuthRequestInProgress(true));

  const jsonData = {
    [apiService.clientLoginDataFields.grantType]: apiService.grantTypes.clientCredentials,
    [apiService.clientLoginDataFields.clientId]: username,
    [apiService.clientLoginDataFields.clientSecret]: password,
  };

  apiService.postLogin(jsonData)
        .then((response) => {
          dispatch(setAuthRequestInProgress(false));
          if (response.ok) {
            console.warn('auth result success');
            dispatch(setAuthResult('Success'));
            dispatch(setUsername(username));
            dispatch(setToken(response.data.access_token));
            actionsRoute.replaceByJobs();
            AsyncStorageHelper.setToken(response.data.access_token);
          } else {
            dispatch(setAuthResult(response.data.error_description));
          }
        })
        .catch((error) => {
          console.warn('error', error);
        });
};

