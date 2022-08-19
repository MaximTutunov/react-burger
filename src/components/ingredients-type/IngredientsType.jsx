import React from 'react';
import { forwardRef } from "react";
import styles from "../ingredients-type/ingredientstype.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";



export const IngredientsCategory = forwardRef(
  ({ title, ingredients, id }, ref) => {
    return (
      <>
        <h2
          id={id}
          className={`${styles.title} text text_type_main-medium mt-10 mb-5`}
          ref={ref}
        >
          {title}
        </h2>
        <div className={styles.optionscards}>
          {ingredients.map((ingredient) => (
            <BurgerIngredient key={ingredient._id} {...ingredient} />
          ))}
        </div>
      </>
    );
  }
);
