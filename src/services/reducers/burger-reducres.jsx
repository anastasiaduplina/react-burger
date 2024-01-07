import {
    LOAD_INGREDIENTS,
    LOAD_DETAILS,
    DELETE_DETAILS,
    ORDER_NUMBER,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    CHANGE_INGREDIENT,
    ORDER_CLEAR,
  } from '../actions';
  
  const initialState = {
    ingredients: [],
    constructor: [],
    ingredient: {},
    order: 0,
  };
  
  export const burgerReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_INGREDIENTS:
        return {
          ...state,
          ingredients: action.data.map((el) => {
            el['count'] = 0;
            return el;
          }),
        };
      case LOAD_DETAILS:
        return {
          ...state,
          ingredient: action.item,
        };
      case DELETE_DETAILS:
        return {
          ...state,
          ingredient: {},
          order: 0,
        };
      case ORDER_NUMBER:
        return {
          ...state,
          order: action.number,
        };
      case ADD_INGREDIENT:
        return {
          ...state,
          constructor: [
            ...state.constructor,
            { ...action.item, constId: action.id },
          ],
          ingredients: [...state.ingredients].map((item) =>
            item._id === action.item._id
              ? { ...item, count: item.count + action.qnt }
              : item
          ),
        };
      case DELETE_INGREDIENT:
        return {
          ...state,
          constructor: [...state.constructor].filter(
            (item) => item.constId !== action.item.constId
          ),
          ingredients: [...state.ingredients].map((item) =>
            item._id === action.item._id
              ? { ...item, count: item.count - action.qnt }
              : item
          ),
        };
      case CHANGE_INGREDIENT:
        const newConstructor = [...state.constructor];
        const dragIngredient = newConstructor[action.dragIndex];
        newConstructor.splice(action.dragIndex, 1);
        newConstructor.splice(action.hoverIndex, 0, dragIngredient);
  
        return {
          ...state,
          constructor: newConstructor,
        };
      case ORDER_CLEAR:
        return {
          ...state,
          constructor: [],
          ingredients: [...state.ingredients].map((item) => {
            item['count'] = 0;
            return item;
          }),
        };
  
      default:
        return state;
    }
  };