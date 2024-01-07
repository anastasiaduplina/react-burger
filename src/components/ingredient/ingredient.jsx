import React from 'react';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredient.module.css';
import { typeOfIngredientsData } from '../../utils/const';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch } from 'react-redux';
import { LOAD_DETAILS } from '../../services/actions/index';
import { useDrag } from 'react-dnd';

function Ingredient({ item, onModalOpen }) {
  const dispatch = useDispatch();
  function onClick() {
    dispatch({
      type: LOAD_DETAILS,
      item: item,
    });
    const modalChild = <IngredientDetails />;
    const modalHeader = 'Детали ингредиента';
    onModalOpen(modalChild, modalHeader);
  }
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: item,
  });
  return (
    <div ref={dragRef} className={style.card} onClick={onClick}>
      <img src={item.image} alt={item.name}  />
      <div className={style.price +' mt-1'}>
        <p className="text text_type_digits-default">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{item.name}</p>
      <div className={style.counter}>
        {item.count > 0 && <Counter count={item.count} size="default" />}
      </div>
    </div>
  );
}

export default Ingredient;

Ingredient.propTypes = {
  item: typeOfIngredientsData.isRequired,
  onModalOpen: PropTypes.func.isRequired,
};