import * as types from '../actions/actionsJobsList';

const initialState = {
  page: 1,
  jobs: [],
  hasMoreJobs: true,
};

export default function reducerCards(state = initialState, action) {
  switch (action.type) {
    case types.SET_JOBS: {
      return {
        ...state,
        jobs: action.data,
      };
    }

    case types.SET_PAGE: {
      return {
        ...state,
        page: action.data,
      };
    }

    case types.HAS_MORE: {
      return {
        ...state,
        hasMoreJobs: action.data,
      };
    }

    default:
      return state;
  }
}
