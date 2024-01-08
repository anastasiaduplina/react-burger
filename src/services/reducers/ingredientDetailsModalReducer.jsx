import {
    LOAD_DETAILS,
    DELETE_DETAILS,
    REQUEST_PENDING,
    REQUEST_SUCCESS,
  } from '../actions';
  
  const initialState = {
    ingredient: {},
    loadDetailsStatus: REQUEST_PENDING,
    deleteDetailsStatus:REQUEST_PENDING,
  };
  
  export const ingredientDetailsModalReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_DETAILS:
        return {
          ...state,
          ingredient: action.item,
          loadDetailsStatus: REQUEST_SUCCESS,
        };
        case DELETE_DETAILS:
        return {
          ...state,
          ingredient: {},
          deleteDetailsStatus: REQUEST_SUCCESS,
        };
      default:
        return state;
    }
  };
  