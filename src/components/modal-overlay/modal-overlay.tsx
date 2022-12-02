import { FC } from "react";
import { TModalOverlay } from "../../services/types";
import style from "./modal-overlay.module.css";

export const ModalOverlay: FC<TModalOverlay> = ({ closeModal }) => {
  return <div className={style.overlay} onClick={closeModal}></div>;
};
