import React from "react";
import styles from "./burgerConstructor.module.css";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { data } from "../../utils/data.js";
import { isTemplateMiddle } from "typescript";

const getTopping = (data) => {
  return (
    <ul className={styles.list_toppings}>
      {data
        .filter((item) => item.type !== "bun")
        .map((item) => (
          <li className={styles.item_topping} key={item._id}>
            <DragIcon />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </li>
        ))}
    </ul>
  );
};

const BurgerConstructor = () => {
  return (
    <section className={styles.constructor}>
      <div className={styles.ingredients}>
        <div className="pl-8">
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={data[0].image}
          />
        </div>
        {getTopping(data)}
        <div className="pl-8">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={data[0].image}
          />
        </div>
      </div>
      <div className={styles.order}>
        <div className={styles.total__price}>
          <p className={"text"}>
            {data.reduce((acc, topping) => {
              const totalPrice =
                acc + (topping.type !== "bun" ? topping.price : 0);
              return totalPrice;
            }, 0)}
          </p>
          <CurrencyIcon />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
