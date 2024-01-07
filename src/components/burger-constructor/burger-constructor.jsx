import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import style from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import {
  CurrencyIcon,
  ConstructorElement,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { postOrder } from '../../services/actions/burger-actions';
import { useDrop } from 'react-dnd';
import {
  ADD_INGREDIENT,
  CHANGE_INGREDIENT,
  DELETE_INGREDIENT,
} from '../../services/actions';
import IngredientConstructor from '../ingredient-constructor/ingredinet-constructor';

const initialState = { total: 0 };

function BurgerConstructor({ onModalOpen }) {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.burgerReducer.constructor);
  const constId = Date.now();
  console.log(data);

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      onDropHandler(item);
    },
  });

  const onDropHandler = (item) => {
    let qnt = 1;
    if (item.type === 'bun') {
      qnt = 2;
      const bunElement = data.find((el) => el.type === 'bun');
      if (bunElement) {
        dispatch({
          type: DELETE_INGREDIENT,
          item: bunElement,
          qnt: qnt,
        });
      }
    }
    dispatch({
      type: ADD_INGREDIENT,
      item: item,
      id: constId,
      qnt: qnt,
    });
  };
  let burgerBun = data.find((item) => item.type === 'bun');
  if(!burgerBun){
    burgerBun={
      _id: '60666c42cc7b410027a1a9b1',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0,
    }
  }

  const [stateTotal, dispatchTotal] = useReducer(reducer, initialState);

  function reducer(state, action) {
    const total = data.reduce(
      (sum, item) => sum + (item.type === 'bun' ? item.price * 2 : item.price),
      0
    );
    return { total: total };
  }
  function onClick() {
    dispatch(postOrder(data));
    const modalChild = <OrderDetails />;
    const modalHeader = '';
    onModalOpen(modalChild, modalHeader);
  }
  function moveElement(dragIndex, hoverIndex) {
    dispatch({
      type: CHANGE_INGREDIENT,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
    });
  }
  React.useEffect(() => {
    dispatchTotal();
  }, [data]);
  const inactiveButtonStyle = burgerBun
    ? {}
    : { opacity: 0.5, cursor: 'default' };
  
  return (
    <div ref={dropTarget} className="mt-25 ml-4">
      <ConstructorElement
        type="top"
        isLocked={true}
        text={burgerBun.name + ' (верх)'}
        price={burgerBun.price}
        thumbnail={burgerBun.image_mobile}
      />
      <div className={style.list + ' mt-4 mb-4 pr-4'}>
      {data.map(
          (el, index) =>
          el.type !== 'bun' && (
            <IngredientConstructor
              item={el}
              index={index}
              key={el.constId}
              moveElement={moveElement}
            />
            )
        )}
      </div>

      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={burgerBun.name + ' (низ)'}
        price={burgerBun.price}
        thumbnail={burgerBun.image_mobile}
      />

      <div className={style.footer + '  mt-10'}>
        <div className="mr-10">
          <p
            className={
              style.total + ' text text_type_digits-medium'
            }
          > {stateTotal.total}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" htmlType="button"  size="medium" style={inactiveButtonStyle} onClick = { onClick }>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  onModalOpen: PropTypes.func.isRequired,
};