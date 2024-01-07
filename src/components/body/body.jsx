import React from 'react';
import PropTypes from 'prop-types';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import style from './body.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function Body({ onModalOpen }) {
    console.log("888");
  return (
    <div className={style.main}>
      <DndProvider backend={HTML5Backend}>
        <div className="mr-10">
          <h1
            className={`${style.label} text text_type_main-large mt-10 mb-5`}
          >
            Соберите бургер
          </h1>
          <BurgerIngredients onModalOpen={onModalOpen} />
        </div>
        <BurgerConstructor onModalOpen={onModalOpen} />
      </DndProvider>
    </div>
  );
}

export default Body;

Body.propTypes = {
  onModalOpen: PropTypes.func.isRequired,
};