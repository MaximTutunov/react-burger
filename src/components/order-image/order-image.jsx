import style from "./order-image.module.css";
import propTypes from "prop-types";

export const OrderImage = ({ image, alt }) => {
  return (
    <div className={style.border}>
      <div className={style.item}>
        <img className={style.image} src={image} alt={alt} />
      </div>
    </div>
  );
};

OrderImage.propTypes = {
  image: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
};