import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import React, { useState } from "react";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { getOrderNum, onDropHandler, deleteItem } from "../../services/actions";
import { useDrop } from "react-dnd/dist/hooks/useDrop";
import BurgerCustom from "../burger-custom/burger-custom";

export default function BurgerConstructor() {
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const dispatch = useDispatch();
  const { bun, filling, order } = useSelector((store) => ({
    bun: store.assembled.constructorData.bun,
    filling: store.assembled.constructorData.filling,
    order: store.ingredients.order,
  }));
  const bunPrice = bun && bun.price * 2;

  const totalPrice = bun
    ? filling.reduce(function (acc, obj) {
        return acc + obj.price * obj.count;
      }, bunPrice)
    : filling.reduce(function (acc, obj) {
        return acc + obj.price * obj.count;
      }, 0);
  const dropHandler = (item) => {
    dispatch(onDropHandler(item));
  };

  const [, dropTarget] = useDrop(() => ({
    accept: "ingredient",
    drop: (item, monitor) => {
      dropHandler(item);
    },
  }));

  const openModal = () => {
    setIsOrderDetailsOpened(true);
    const bunIdArr = bun && [`${bun._id}`];
    const orderData =
      bun && filling && filling.map((el) => el._id).concat(bunIdArr);
    dispatch(getOrderNum(orderData));
  };

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
  };

  const deleteHandler = (item) => {
    dispatch(deleteItem(item));
  };

  return (
    <section
      className={`${styles.burgerConstructor} mt-25 pl-4`}
      ref={dropTarget}
    >
      {bun && (
        <div className={`${styles} ml-8 pb-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <ul className={`${styles.list} `}>
        {!bun && filling.length === 0 && (
          <div className={styles.prompt}>
            <p className="text text_type_main-medium">
              Перетащите сюда ингредиенты
            </p>
          </div>
        )}
        {!bun && filling.length > 0 && (
          <div className={styles.prompt}>
            <p className="text text_type_main-medium">Добавьте булочку</p>
          </div>
        )}
        {bun && filling.length === 0 && (
          <div className={styles.prompt}>
            <p className="text text_type_main-medium">Добавьте начинку</p>
          </div>
        )}
        {filling.map((item, index) => (
          <BurgerCustom
            key={item.key}
            item={item}
            handleClose={() => deleteHandler(item)}
            index={index}
          />
        ))}
      </ul>

      {bun && (
        <div className={`${styles} ml-8 pb-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <div className={`${styles.totalBox} pt-10`}>
        <div className={`${styles.priceBox} pr-10`}>
          <p className="text text_type_digits-medium pr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
      {isOrderDetailsOpened && (
        <Modal onClose={closeAllModals}>
          <OrderDetails value={order} />
        </Modal>
      )}
    </section>
  );
}
