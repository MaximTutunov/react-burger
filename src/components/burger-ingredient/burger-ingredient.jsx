import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IngredientsDetails from "../ingredients-details/ingredients-details";
import Modal from "../modal/modal";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import { ingredientsPropTypes } from "../../utils/proptypes";
import {
  openCurrentIngredient,
  closeCurrentIngredient,
} from "../../services/actions";

export default function BurgerIngredient(props) {
  const dispatch = useDispatch();
  const { bun, filling } = useSelector((store) => ({
    bun: store.constructor.constructorData.bun,
    filling: store.constructor.constructorData.filling,
  }));

  const isModalOpen = useSelector((store) => store.details.isModalOpen);

  let count;

  filling &&
    filling.map((element) => (element._id === props._id ? (count = element.count) : null));

  let bunValue = bun && bun._id === props._id && bun.count;
  

  const openModal = () => {
    dispatch(openCurrentIngredient(props), [dispatch]);
  };
  const closeAllModals = () => {
    dispatch(closeCurrentIngredient(props), [dispatch]);
  };

  return (
    <>
      <div className={styles.card} onClick={openModal}>
        <img src={props.image} alt={props.name} />
        <div className={`${styles.price} text text_type_digits-default`}>
          <p className={`${styles.price} pt-1 pb-1 pr-2`}>{props.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{props.name}</p>
        <div className={styles.counter}>
          {count && <Counter count={count} size="default" />}
          {bunValue && <Counter count = {bunValue} size = "default"/>}
        </div>
      </div>
      {isModalOpen && (
        <Modal title="Детали ингредиента" onClose={closeAllModals}>
          <IngredientsDetails  />
        </Modal>
      )}
    </>
  );
}

BurgerIngredient.propTypes = ingredientsPropTypes.isRequired;
