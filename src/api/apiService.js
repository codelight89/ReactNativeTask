/**
 * Created by user on 17.07.17.
 */
import { create } from 'apisauce';

import { urls } from '../constants/urls';


export const grantTypes = {
  clientCredentials: 'client_credentials',
};

export const clientLoginDataFields = {
  grantType: 'grant_type',
  clientId: 'client_id',
  clientSecret: 'client_secret',
};

export const token = 'token';

const api = create({
  baseURL: urls.baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

export const postLogin = data => new Promise((resolve, reject) => {
  // fake api call
  console.warn('data', data);
  console.warn('postLogin');
  api
    .post(urls.token, data, null)
    .then((response) => {
      console.warn('response login ', response.data);
      resolve(response);
    })
    .catch((error) => {
      console.warn('login error:', error);
      reject(error);
    });
});

export const getJobs = (apiToken, page) => new Promise((resolve, reject) => {
  console.warn('getJobs');
  api
    .get(`${urls.jobsList}/${page}`, { token: apiToken }, null)
    .then((response) => {
      resolve(response);
    })
    .catch((error) => {
      console.warn('getJobs error', error);
      reject(error);
    });
});
