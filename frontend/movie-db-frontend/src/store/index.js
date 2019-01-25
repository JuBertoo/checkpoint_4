import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import allReducer from './reducers';


export default createStore(
  allReducer,
  applyMiddleware(logger)
);