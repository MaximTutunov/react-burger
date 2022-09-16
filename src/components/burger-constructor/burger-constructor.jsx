import React, {  useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor.module.css";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { apiOrder } from "../../utils/api";
import {
  getOrderNum,
  getTotalPrice,
  deleteItem,
} from "../../services/actions";

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const [stateOrder, setStateOrder] = useState(false);

 const { bun, filling, order, totalPrice } = useSelector((store) => ({
    bun: store.ingredients.constructorData.bun,
    filling: store.ingredients.constructorData.filling,
    order: store.ingredients.order,
    totalPrice: store.ingredients.totalPrice,
  }));

  const bunIdArr = [`${bun._id}`];

  

  useMemo(() => bunIdArr.push(`${bun._id}`), [bun]);

  const orderData = useMemo(
    () =>
      Array.from(filling.map((el) => el._id)).concat(bunIdArr),
    [filling]
  );

  const openModal = () => {
    setStateOrder(true);
    dispatch(getOrderNum(orderData));
  };

  const closeAllModals = () => {
    setStateOrder(false);
  };

  useEffect(() => {
    dispatch(getTotalPrice(bun, filling));
  }, [dispatch]);

  return (
    <section className={`${styles.burgerConstructor} mt-25 pl-4`}>
        <div className={`${styles.container} ml-8 pb-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <div className={`${styles.container} `}>
          <ul className={`${styles.list} `}>
            {filling.map((ingredient) => (
              <li className={`${styles.item} pb-4 pr-2`} key={ingredient._id}>
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
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <div className={`${styles.totalBox} pt-10`}>
          <div className={`${styles.priceBox} pr-10`}>
            <p className="text text_type_digits-medium pr-2">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large" onClick={openModal}>
            Оформить заказ
          </Button>
        </div>
        {stateOrder && (
          <Modal onClose={closeAllModals}>
            <OrderDetails value={order} />
          </Modal>
        )}
    </section>
  );
};

export default BurgerConstructor;
