import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import style from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import {
    CloseIcon,
  } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('react-modals');

function Modal({ children, onClose, header = '' }) {
  function onOverlayClick() {
    onClose();
  }

  React.useEffect(() => {
    function onPressEsc(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', onPressEsc);
    return () => {
      document.removeEventListener('keydown', onPressEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onOverlayClick} />
      <div className={style.modal}>
        <div className={style.header + ' mt-10 mr-10 ml-10'}>
          <h1 className={style.label + ' text text_type_main-large'}>
            {header}
          </h1>
          <CloseIcon onClick={onClose} />
        </div>
        <div className={style.children}>{children}</div>
      </div>
    </>,
    modalRoot
  );
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string,
};