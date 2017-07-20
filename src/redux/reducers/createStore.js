/**
 * Created by user on 17.07.17.
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './createReducer';

const store = createStore(
    reducer,
    applyMiddleware(thunk),
);

export default store;
