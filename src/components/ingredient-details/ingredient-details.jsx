import React from "react";
import styles from "./ingredients-details.module.css";
import { useSelector } from "react-redux";
import {useParams} from 'react-router-dom';

export default function IngredientDetails() {
  const { id } = useParams();
  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );
  const data = ingredients.find((ingredient) => ingredient._id === id);
  return (
    <>
      {data && (
        <div
          className={`${ingredientDetailsStyles.container} pr-25 pb-15 pl-25`}
        >
          <img
            className={`${ingredientDetailsStyles.pic}`}
            src={data.image_large}
            alt={data.name}
          />
          <h3
            className={`${ingredientDetailsStyles.title} text text_type_main-medium pt-3`}
          >
            {data.name}
          </h3>
          <ul className={`${ingredientDetailsStyles.list} pt-8`}>
            <IngredientsDetailsItem
              value={data.calories}
              text="Калорийность, ккал"
            />

            <IngredientsDetailsItem value={data.proteins} text="Белки, г" />

            <IngredientsDetailsItem value={data.fat} text="Жиры, г" />

            <IngredientsDetailsItem
              value={data.carbohydrates}
              text="Углеводы, г"
            />
          </ul>
        </div>
      )}
    </>
  );
}


