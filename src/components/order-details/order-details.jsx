import React from 'react';
import style from './order-details.module.css';
import imageDone from '../../images/done.svg';
import { useSelector } from 'react-redux';

function OrderDetails() {
  const order = useSelector((store) => store.order.order);

  return (
    <div className={style.bigCard}>
      <p className={style.order + ' text text_type_digits-large'}>
        {order}
      </p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img
        src={imageDone}
        alt="Успешно"
        className={style.done + ' mt-15'}
      />
      <p className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </p>
      <p
        className={
          style.stationText +
          ' text text_type_main-default mt-2 mb-30'
        }
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;