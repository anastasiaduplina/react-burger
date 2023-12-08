import React from 'react';
import PropTypes from 'prop-types';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredient.module.css';
import { typeOfIngredientsData } from '../../utils/const';
import IngredientDetails from '../ingredient-details/ingredient-details';

function Ingredient({ item, onModalOpen }) {
  function onClick() {
    const modalChild = <IngredientDetails item={item} />;
    const modalHeader = 'Детали ингредиента';
    onModalOpen(modalChild, modalHeader);
  }
  return (
    <div className={style.card} onClick={onClick}>
      <img src={item.image} alt={item.name}  />
      <div className={style.price +' mt-1'}>
        <p className="text text_type_digits-default">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{item.name}</p>
      <div className={style.counter}>
        <Counter count={1} size="default" />
      </div>
    </div>
  );
}

export default Ingredient;

Ingredient.propTypes = {
  item: typeOfIngredientsData.isRequired,
  onModalOpen: PropTypes.func.isRequired,
};