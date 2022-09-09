import React, {useContext, useState} from "react";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ArrayPropTypes } from "../../utils/proptypes";
import styles from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { BurgerConstructorContext } from "../../services/BurgerConstructorContext";


const BurgerConstructor = () => {
  const [stateOrder, setStateOrder] = React.useState(false);
  const {data} = useContext(BurgerConstructorContext);
  const ingredientsArr = data.filter((ingredient) => ingredient.type !== "bun");
  
  const openModal = () => {
    setStateOrder(true);
  };

  const closeAllModals = () => {
    setStateOrder(false);
  };

  return (
    <section
      className={`${styles.burgerConstructor} mt-25 pl-4`}
    >
      <div className={`${styles.container} ml-8 pb-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${data[0].name} (верх)`}
          price={20}
          thumbnail={data[0].image}
        />
      </div>
      <div className={`${styles.container} `}>
        <ul className={`${styles.list} `}>
          {ingredientsArr.map((ingredient) => (
            <li
              className={`${styles.item} pb-4 pr-2`}
              key={ingredient._id}
            >
              <div className="mr-2">
                <DragIcon type="primary" />
              </div>
              <ConstructorElement
                isLocked={false}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={`${styles.container} ml-8`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${data[0].name} (низ)`}
          price={20}
          thumbnail={data[0].image}
        />
      </div>
      <div className={`${styles.totalBox} pt-10`}>
        <div className={`${styles.priceBox} pr-10`}>
          <p className="text text_type_digits-medium pr-2">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
      {stateOrder && (
        <Modal onClose={closeAllModals}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
BurgerConstructor.propTypes = {
  data: ArrayPropTypes,
};
export default BurgerConstructor;
