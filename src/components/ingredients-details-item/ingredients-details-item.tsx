import { FC } from "react";
import style from "./ingredients-details-item.module.css";
import { TIngredientsDetailsItem } from "../../services/types";
const IngredientsDetailsItem: FC<TIngredientsDetailsItem> = (data) => {
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
};
export default IngredientsDetailsItem;
