import { combineReducers } from 'redux';
import { burgerReducer } from './burger-reducres.jsx';

export const rootReducer = combineReducers({
  burgerReducer,
});