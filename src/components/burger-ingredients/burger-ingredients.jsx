import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';
import { typeOfIngredientsData } from '../../utils/const';
import Ingredient from '../ingredient/ingredient';


function BurgerIngredients({ data, onModalOpen }) {
  const [current, setCurrent] = React.useState('bun');
  const bunArray = data.filter((item) => item.type === 'bun');
  const mainArray = data.filter((item) => item.type === 'main');
  const sauceArray = data.filter((item) => item.type === 'sauce');
  return (
    <section className={style.section}>
      <div className={style.tab}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={style.ingredients}>
        <p
          className={
            style.chapterLabel +
            ' mt-10 text text_type_main-medium'
          }
        >
          Булки
        </p>
        <div className={style.chapter + ' mt-6 ml-4'}>
          {bunArray.map((item) => (
            <Ingredient item={item} key={item._id} onModalOpen={onModalOpen}/>
          ))}
        </div>
        <p
          className={
            style.chapterLabel +
            ' mt-10 text text_type_main-medium'
          }
        >
          Соусы
        </p>
        <div className={style.chapter + ' mt-6 ml-4'}>
          {sauceArray.map((item) => (
            <Ingredient item={item} key={item._id} onModalOpen={onModalOpen}/>
          ))}
        </div>
        <p
          className={
            style.chapterLabel +
            ' mt-10 text text_type_main-medium'
          }
        >
          Начинки
        </p>
        <div className={style.chapter+' mt-6 ml-4'}>
          {mainArray.map((item) => (
            <Ingredient item={item} key={item._id} onModalOpen={onModalOpen}/>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;

BurgerIngredients.propTypes = {
   data: PropTypes.arrayOf(typeOfIngredientsData).isRequired,
  onModalOpen: PropTypes.func.isRequired,
};