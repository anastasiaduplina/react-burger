import { LOAD_INGREDIENTS, REQUEST_PENDING, REQUEST_SUCCESS } from '../actions';

const initialState = {
  ingredients: [],
  loadIngredientsStatus: REQUEST_PENDING,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_INGREDIENTS:
      return {
        ...state,
        ingredients: action.data.map((el) => {
          el['count'] = 0;
          return el;
        }),
        loadIngredientsStatus: REQUEST_SUCCESS,
      };
    default:
      return state;
  }
};
