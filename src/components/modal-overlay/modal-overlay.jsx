import React from 'react';
import PropTypes from 'prop-types';
import style from './modal-overlay.module.css';

function ModalOverlay({ onClick }) {
  return <div className={style.overlay} onClick={onClick}></div>;
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};