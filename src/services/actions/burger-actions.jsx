import { api } from '../../utils/const';
import { LOAD_INGREDIENTS, ORDER_NUMBER, REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_FAILURE } from './index';
import { apiOrder } from '../../utils/const';

export function getData() {
  return function (dispatch) {
    dispatch({
      type: REQUEST_PENDING,
    });

    fetch(api)
      .then((answer) => {
        if (answer.ok) {
          return answer.json();
        }
        return Promise.reject(`Ошибка ${answer.status}`);
      })
      .then((answer) => {
        if (answer.success) {
          dispatch({
            type: LOAD_INGREDIENTS,
            data: answer.data,
          });
          dispatch({
            type: REQUEST_SUCCESS,
          });
        } else {
          dispatch({
            type: REQUEST_FAILURE,
          });
          return Promise.reject(`Ошибка данных`);
        }
      })
      .catch((error) => {
        console.log(error.message);
        dispatch({
          type: REQUEST_FAILURE,
        });
      });
  };
}

export function postOrder(data) {
  return async function (dispatch) {
    dispatch({
      type: REQUEST_PENDING,
    });

    const orderArray = data.map((item) => item._id);
    const response = await fetch(apiOrder, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        ingredients: orderArray,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res.success) {
          dispatch({
            type: ORDER_NUMBER,
            number: res.order.number,
          });
        //   dispatch({
        //     type: ORDER_CLEAR,
        //   });
          dispatch({
            type: REQUEST_SUCCESS,
          });
        } else {
          dispatch({
            type: REQUEST_FAILURE,
          });
          return Promise.reject(`Ошибка данных`);
        }
      })
      .catch((error) => {
        console.log(error.message);
        dispatch({
          type: REQUEST_FAILURE,
        });
      });

    return response;
  };
}
