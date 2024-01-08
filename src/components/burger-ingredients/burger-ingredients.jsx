import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';
import Ingredient from '../ingredient/ingredient';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getData } from '../../services/actions/burger-actions';

function BurgerIngredients({ onModalOpen }) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getData());
  }, [dispatch]);
  const data = useSelector((store) => store.ingredients.ingredients); 
  const [current, setCurrent] = React.useState('bun');
  const bunArray = data.filter((item) => item.type === 'bun');
  const mainArray = data.filter((item) => item.type === 'main');
  const sauceArray = data.filter((item) => item.type === 'sauce');
  
  const ingredientsWindow = document.querySelector('#ingredients');
  const bunElement = document.querySelector('#bun');
  const sauceElement = document.querySelector('#sauce');
  const mainElement = document.querySelector('#main');

  const scrollListener = (evt) => {
    const bunLength = Math.abs(
      ingredientsWindow.getBoundingClientRect().top -
        bunElement.getBoundingClientRect().top
    );
    const sauceLength = Math.abs(
      ingredientsWindow.getBoundingClientRect().top -
        sauceElement.getBoundingClientRect().top
    );
    const mainLength = Math.abs(
      ingredientsWindow.getBoundingClientRect().top -
        mainElement.getBoundingClientRect().top
    );
    const rightTabLength = Math.min(bunLength, sauceLength, mainLength);
    setCurrent(
      bunLength === rightTabLength? 'bun': sauceLength === rightTabLength ? 'sauce': 'main'
    );
  };
  
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
      <div id="ingredients" onScroll={scrollListener} className={style.ingredients}>
        <p
        id="bun"
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
        id="sauce"
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
        <p id="main"
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
  onModalOpen: PropTypes.func.isRequired,
};