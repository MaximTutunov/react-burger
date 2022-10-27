import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import style from "./modal.module.css";
const modalWindow = document.querySelector("#modal");

export default function Modal({ description, closeModal, children }) {
  React.useEffect(() => {
    function handleEscKeydown(evt) {
      if (evt.key === "Escape") {
        closeModal();
      }
    }
    document.addEventListener("keydown", handleEscKeydown);
    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={style.container}>
        <h3
          className={`${style.description} text text_type_main-large pt-15 pb-1 pl-10`}
        >
          {description}
        </h3>
        <button className={style.close_button}>
          <CloseIcon onClick={closeModal} />
        </button>
        {children}
      </div>
      <ModalOverlay closeModal={closeModal} />
    </>,
    modalWindow
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  description: PropTypes.string,
};
