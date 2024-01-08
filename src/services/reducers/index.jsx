// rootReducer.js
import { combineReducers } from 'redux';
import {ingredientsReducer} from './ingredientsReducer';
import {constructorReducer} from './constructorReducer';
  import {ingredientDetailsModalReducer} from './ingredientDetailsModalReducer';
  import { orderReducer} from './orderReducer';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  ingredientsDetailModal: ingredientDetailsModalReducer,
  order: orderReducer,
});

export default rootReducer;
