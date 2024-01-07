import React from 'react';
import style from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

function IngredientDetails() {
  const item = useSelector((store) => store.burgerReducer.ingredient);
  return (
    <div className={style.bigCard}>
      <img src={item.image_large} alt={item.name}  className="mr-5 ml-5" />
      <p
        className={
          style.bigCardName +
          ' text text_type_main-medium mt-4'
        }
      >
        {item.name}
      </p>
      <div className={style.nutrients + ' mt-8 mb-15'}>
        <div className={style.nutrient + ' mr-5'}>
          <p className="text text_type_main-default">Калории, ккал</p>
          <p className="text text_type_digits-default">{item.calories}</p>
        </div>
        <div className={style.nutrient + ' mr-5'}>
          <p className="text text_type_main-default">Белки, г</p>
          <p className="text text_type_digits-default">{item.proteins}</p>
        </div>
        <div className={style.nutrient + ' mr-5'}>
          <p className="text text_type_main-default">Жиры, г</p>
          <p className="text text_type_digits-default">{item.fat}</p>
        </div>
        <div className={style.nutrient}>
          <p className="text text_type_main-default">Углеводы, г</p>
          <p className="text text_type_digits-default">{item.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;