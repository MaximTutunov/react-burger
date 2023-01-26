import { useParams } from "react-router-dom";
import IngredientsDetailsItem from "../ingredients-details-item/ingredients-details-item";
import style from "./ingredient-details.module.css";
import { FC } from "react";
import { useTypedSelector } from "../../services/types";

const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredients = useTypedSelector(
    (state) => state.burgerIngredients.ingredients
  );
  const data = ingredients.find((ingredient) => ingredient._id === id);
  return (
    <>
      {data && (
        <div className={`${style.container} pr-25 pb-15 pl-25`}>
          <img
            className={`${style.pic}`}
            src={data.image_large}
            alt={data.name}
          />
          <h3 className={`${style.title} text text_type_main-medium pt-3`}>
            {data.name}
          </h3>
          <ul className={`${style.list} pt-8`}>
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
};

export default IngredientDetails;
