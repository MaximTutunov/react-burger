import PropTypes from "prop-types";
import style from "./modal-overlay.module.css";

export default function  ModalOverlay ({ closeModal }) {
  return (
    <div className={style.overlay} onClick={closeModal}></div>
  );
};

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};