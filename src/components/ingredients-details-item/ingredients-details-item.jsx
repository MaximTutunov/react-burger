import PropTypes from "prop-types";
import style from "./ingredients-details-item.module.css";

const IngredientsDetailsItem = (data) => {
  return (
    <li className={`${style.item}`}>
      <p
        className={`${style.text} text text_type_main-default text_color_inactive pb-2`}
      >
        {data.text}
      </p>
      <p
        className={`${style.text} text text_type_main-default text_color_inactive`}
      >
        {data.value}
      </p>
    </li>
  );
}

IngredientsDetailsItem.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};
export default IngredientsDetailsItem;