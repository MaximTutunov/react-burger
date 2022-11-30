import style from "./order-image.module.css";
import propTypes from "prop-types";
import {FC} from 'react';
import {TOrderImage} from '../../services/types';

const OrderImage:FC<TOrderImage> = ({ image, alt }) => {
  return (
    <div className={style.border}>
      <div className={style.item}>
        <img className={style.image} src={image} alt={alt} />
      </div>
    </div>
  );
};

export default OrderImage