import React from "react";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd/dist/hooks";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import { ingredientsPropTypes } from "../../utils/proptypes";

export default function BurgerIngredient(props) {
  const { bun, filling } = useSelector((store) => ({
    bun: store.assembled.constructorData.bun,
    filling: store.assembled.constructorData.filling,
  }));

  let count;

  filling &&
    filling.map((el) => (el._id === props._id ? (count = el.count) : null));

  const bunValue = bun && bun._id === props._id && bun.count;

  const [, dragRef] = useDrag(
    () => ({
      type: "ingredient",
      item: props,
    }),
    [props]
  );

  return (
    <>
      <div className={styles.card} onClick={props.openModal} ref={dragRef}>
        <img src={props.image} alt={props.name} />
        <div className={`${styles.price} text text_type_digits-default`}>
          <p className={`${styles.price} pt-1 pb-1 pr-2`}>{props.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{props.name}</p>
        <div className={styles.counter}>
          {count && <Counter count={count} size="default" />}
          {bunValue && <Counter count={bunValue} size="default" />}
        </div>
      </div>
    </>
  );
}

BurgerIngredient.propTypes = ingredientsPropTypes.isRequired;
