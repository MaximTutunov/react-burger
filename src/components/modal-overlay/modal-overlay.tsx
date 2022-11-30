import PropTypes from "prop-types";
import {FC} from 'react';
import {TModalOverlay} from '../../services/types';
import style from "./modal-overlay.module.css";

 const ModalOverlay:FC <TModalOverlay> = ({ closeModal }) => {
  return (
    <div className={style.overlay} onClick={closeModal}></div>
  );
};
export default