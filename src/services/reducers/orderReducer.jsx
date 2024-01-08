import {
    ORDER_NUMBER,
    REQUEST_PENDING,
    REQUEST_SUCCESS,
  } from '../actions';
  
  const initialState = {
    order: 0,
    orderNumberStatus: REQUEST_PENDING,
  };
  
  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case ORDER_NUMBER:
        return {
          ...state,
          order: action.number,
          orderNumberStatus: REQUEST_SUCCESS,
        };
        
      default:
        return state;
    }
  };
  
  export default orderReducer;
  