import {
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    CHANGE_INGREDIENT,
    REQUEST_PENDING,
    REQUEST_SUCCESS,
  } from '../actions';
  
  const initialState = {
    constructor: [],
    addIngredientStatus: REQUEST_PENDING,
    deleteIngredientStatus: REQUEST_PENDING,
    changeIngredientStatus: REQUEST_PENDING,
  };
  
  export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_INGREDIENT:
        return {
          ...state,
          constructor: [
            ...state.constructor,
            { ...action.item, constId: action.id },
          ],
          addIngredientStatus: REQUEST_SUCCESS,
        };
      case DELETE_INGREDIENT:
        return {
          ...state,
          constructor: [...state.constructor].filter(
            (item) => item.constId !== action.item.constId
          ),
          deleteIngredientStatus: REQUEST_SUCCESS,
        };
      case CHANGE_INGREDIENT:
        const newConstructor = [...state.constructor];
        const dragIngredient = newConstructor[action.dragIndex];
        newConstructor.splice(action.dragIndex, 1);
        newConstructor.splice(action.hoverIndex, 0, dragIngredient);
  
        return {
          ...state,
          constructor: newConstructor,
          changeIngredientStatus: REQUEST_SUCCESS,
        };
      default:
        return state;
    }
  };
  