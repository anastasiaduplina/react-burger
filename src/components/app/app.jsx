import React, { useEffect, useState } from 'react';
import style from'./app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { api } from '../../utils/const';
import dataConstructorExample from '../../utils/data-constructor-example';
import Modal from '../modal/modal';

function App() {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [modalChild, setModalChild] = React.useState('');
  const [modalHeader, setModalHeader] = React.useState('');

  function onModalOpen(modalContent, modalHeaderLabel = '') {
    setModalChild(modalContent);
    setModalHeader(modalHeaderLabel);
    setModalIsOpen(true);
    console.log("ep")
  }

  function onModalClose() {
    setModalIsOpen(false);
  }
  useEffect(() => {
    fetch(api)
      .then((answer) => {
        if (answer.ok) {
          return answer.json();
        }
        return Promise.reject(`Ошибка ${answer.status}`);
      })
      .then((answer) => {
        if (answer.success) {
          setData(answer.data);
        } else {
          return Promise.reject(`Ошибка данных`);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className={style.app}>
      <AppHeader />
      <main className={style.body}>
        <BurgerIngredients  data={data} onModalOpen={onModalOpen}/>
        <BurgerConstructor  data={dataConstructorExample} onModalOpen={onModalOpen}/>
      </main>
      {modalIsOpen && (
        <Modal onClose={onModalClose} header={modalHeader}>
          {modalChild}
        </Modal>
      )}
    </div>
  );
}

export default App;