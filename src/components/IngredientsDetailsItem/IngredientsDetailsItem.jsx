import React from "react";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd/dist/hooks";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import { ingredientsPropTypes } from "../../utils/proptypes";

const IngredientsDetailsItem = (data) => {
  return (
    <li className={`${ingredientsDetailsItemStyles.item}`}>
      <p
        className={`${ingredientsDetailsItemStyles.text} text text_type_main-default text_color_inactive pb-2`}
      >
        {data.text}
      </p>
      <p
        className={`${ingredientsDetailsItemStyles.text} text text_type_main-default text_color_inactive`}
      >
        {data.value}
      </p>
    </li>
  );
};

IngredientsDetailsItem.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default IngredientsDetailsItem;
