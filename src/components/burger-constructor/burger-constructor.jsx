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
  
  const dataBurger = useSelector((store) => store.burgerConstructor.constructor);
  const dataAll = useSelector((store) => store.ingredients.ingredients); 
  const constId = Date.now();

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
      const bunElement = dataBurger.find((el) => el.type === 'bun');
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
  let burgerBun = dataBurger.find((item) => item.type === 'bun');
  if(typeof burgerBun==='undefined'){
  
    burgerBun={
      name: '',
      price: 0,
      image_mobile: '',
    };
    if(dataAll.length>0){
      burgerBun = dataAll.find((item) => item.type === 'bun');
      let qnt =2;
      dispatch({
        type: ADD_INGREDIENT,
        item: burgerBun,
        id: constId,
        qnt: qnt,
      });
    }
  
  }

  const [stateTotal, dispatchTotal] = useReducer(reducer, initialState);

  function reducer(state, action) {
    const total = dataBurger.reduce(
      (sum, item) => sum + (item.type === 'bun' ? item.price * 2 : item.price),
      0
    );
    return { total: total };
  }
  function onClick() {
    dispatch(postOrder(dataBurger));
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
  }, [dataBurger]);
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
      {dataBurger.map(
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