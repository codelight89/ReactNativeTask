/**
 * Created by user on 17.07.17.
 */
import { combineReducers } from 'redux';
import reducerAuth from './reducerAuth';
import reducerJobs from './reducerJobs';

const reducers = {
  reducerAuth,
  reducerJobs,
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
