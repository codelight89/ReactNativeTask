

import * as apiService from '../../api/apiService';
import * as actionsRoute from './actionsRoute';

export const SET_JOBS = 'SET_JOBS';
export const SET_PAGE = 'SET_PAGE';
export const HAS_MORE = 'HAS_MORE';

export function setJobs(data) {
  return {
    type: SET_JOBS,
    data,
  };
}

export function setPage(data) {
  return {
    type: SET_PAGE,
    data,
  };
}

export function setHasMore(data) {
  return {
    type: HAS_MORE,
    data,
  };
}

const parseJobs = (data) => {
  console.warn('parse jobs');
  let jobs = [];
  if (!data) {
    console.warn('data null');
    return null;
  }

  if (!Array.isArray(data.browse)) {
    console.warn('data browse not array');
    return null;
  }

  console.warn('data ok');

  jobs = data.browse.map(item => ({
    id: item.id,
    employerId: item.employer_id,
    jobTerm: item.job_term,
    fullDescription: item.full_description,
    leySkills: item.key_skills,
    experience: item.experience,
    language: item.language,
    rate: item.rate,
    rateType: item.rate_type,
    maskedRate: item.masked_rate,
    livingWAge: item.living_wage,
    multiple: item.multiple,
    address: item.address,
    town: item.location_town,
    postcode: item.postcode,
    country: item.country,
    latitude: item.latitude,
    longitude: item.longitude,
    comments: item.comments,
    posted: item.posted,
    status: item.status,
    published: item.published,
    expired: item.expired,
    firstName: item.first_name,
    company: item.company,
    companyType: item.company_type,
    employerImg: item.employer_img,
    employerImgV: item.employer_img_v,
    companyImg: item.company_img,
    companyImgV: item.company_img,
    total: item.total,
    role: item.role,
    city: (item.location_city).trim(),
    updated: item.updated,
    dates: item.dates,

  }));

  console.warn('parse jobs success');
  return jobs;
};

export const getJobs = addToCurrent => (dispatch, getState) => {
  const { page, jobs, hasMoreJobs } = getState().reducerJobs;

  if (!hasMoreJobs) {
    return;
  }

  const { token } = getState().reducerAuth;

  console.warn('getJobs with token', token);

  apiService.getJobs(token, page)
        .then((response) => {
          if (response.ok) {
            console.warn('get Jobs on page', page, 'ok', response.data);
            let jobsList = addToCurrent ? jobs : [];
            const newJobsData = parseJobs(response.data);
            console.warn('old data', jobsList);
            if (newJobsData.length === 0) {
              dispatch(setHasMore(false));
            } else {
              jobsList = jobsList.concat(newJobsData);
              console.warn('new jobs data', newJobsData);
              console.warn('jobs added', jobsList);
              dispatch(setJobs(jobsList));
              dispatch(setPage(page + 1));
            }
          } else {
            console.warn('get jobs failed', response);
            actionsRoute.resetToLogin();
          }
        })
        .catch((error) => {
          console.warn('error getting jobs list', error);
        });
};
