import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import styles from "./ingredients-type.module.css";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const Ingredients = ({ tabRef, ingredients, type }) => {
  const categories = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };

  const ingredientCategory = ingredients.filter(
    (element) => element.type === type
  );

  return (
    <li className={ingredientsStyles.category} id={type}>
      <h2
        className={`${ingredientsStyles.name} text text_type_main-medium pb-6 pt-2`}
        ref={tabRef}
      >
        {categories[type]}
      </h2>
      <ul className={ingredientsStyles.list}>
        {ingredientCategory.map((element) => (
          <li className={`${ingredientsStyles.item}`} key={element._id}>
            <IngredientItem key={element._id} ingredient={element} />
          </li>
        ))}
      </ul>
    </li>
  );
};

Ingredients.propTypes = {
  ingredients: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

export default Ingredients;