import IngredientItem from "../ingredient-item/ingredient-item";
import PropTypes from "prop-types";
import styles from "./ingredients.module.css";
import {FC} from 'react';
import {TIngredientsCat} from '../../services/types'

const Ingredients:FC<TIngredientsCat>=({ tabRef, ingredients, type })=>{
  const categories = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };
  const ingredientCategory = ingredients.filter(
    (element) => element.type === type
  );
  return (
    <li className={styles.category} id={type}>
      <h2
        className={`${styles.name} text text_type_main-medium pb-6 pt-2`}
        ref={tabRef}
      >
        {categories[type]}
      </h2>
      <ul className={styles.list}>
        {ingredientCategory.map((element) => (
          <li className={`${styles.item}`} key={element._id}>
            <IngredientItem key={element._id} ingredient={element} />
          </li>
        ))}
      </ul>
    </li>
  );
}


export default Ingredients