import ReactDOM from "react-dom";
import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import PropTypes from "prop-types";

const modalsContainer = document.querySelector("#modals");

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
      <div className={modalStyles.container}>
        <h3
          className={`${modalStyles.description} text text_type_main-large pt-15 pb-1 pl-10`}
        >
          {description}
        </h3>
        <button className={modalStyles.close_button}>
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
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
