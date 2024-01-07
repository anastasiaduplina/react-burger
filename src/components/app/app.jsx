import React, { useEffect} from 'react';
import style from'./app.module.css';
import AppHeader from '../app-header/app-header';
import Body from'../body/body';
import Modal from '../modal/modal';
import { useDispatch } from 'react-redux';
import { getData } from '../../services/actions/burger-actions';
import { DELETE_DETAILS } from '../../services/actions';

function App() {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [modalChild, setModalChild] = React.useState('');
  const [modalHeader, setModalHeader] = React.useState('');

  const dispatch = useDispatch();
  console.log("22");
  useEffect(() => {
    console.log("jhj");
    dispatch(getData());
  }, [dispatch]);
  console.log("444");
  function onModalOpen(modalContent, modalHeaderLabel = '') {
    setModalChild(modalContent);
    setModalHeader(modalHeaderLabel);
    setModalIsOpen(true);
    console.log("ep")
  }

  function onModalClose() {
    setModalIsOpen(false);
    dispatch({
      type: DELETE_DETAILS,
    });
  }
 


  return (
    
    <div className={style.app}>
      <AppHeader />
      <Body onModalOpen={onModalOpen} />
      {modalIsOpen && (
        <Modal onClose={onModalClose} header={modalHeader}>
          {modalChild}
        </Modal>
      )}
      
    
    </div>
  );
}

export default App;