import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from "./ingredients-type.module.css";
import PropTypes from "prop-types";
import { forwardRef } from "react";

export const IngredientsType = forwardRef(({ title, ingredients, id }, ref) => {
  return (
    <>
      <h2
        id={id}
        className={`${styles.title} text text_type_main-medium mt-10 mb-5`} ref={ref}
      >
        {title}
      </h2>
      <div className={styles.columns}>
        {ingredients.map((ingredient) => (
          <BurgerIngredient key={ingredient._id} {...ingredient} />
        ))}
      </div>
    </>
  );
});

IngredientsType.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};
