import React, { useContext, useEffect, useState, useMemo } from "react";
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
import {
  BurgerConstructorContext,
  TotalPriceContext,
} from "../../services/BurgerConstructorContext";
import { apiOrder } from "../../utils/api";

const BurgerConstructor = () => {
  const [stateOrder, setStateOrder] = React.useState(false);

  const { data } = useContext(BurgerConstructorContext);

  const buns = data.filter((ingredient) => ingredient.type === "bun");

  const [totalPrice, setTotalPrice] = useState(0);

  const ingredientsArr = data.filter((ingredient) => ingredient.type !== "bun");

  const [orderNum, setOrderNum] = useState('');

const orderData = useMemo(()=> Array.from(ingredientsArr.map((ingredient)=> ingredient._id)).concat(buns), [ingredientsArr]);


  const openModal = () => {
    setStateOrder(true);
    apiOrder(orderData).then((res) => setOrderNum(res.order.number))
  };

  const closeAllModals = () => {
    setStateOrder(false);
  };

  useEffect(() => {
    let total = 0 + buns[0].price * 2;
    total = ingredientsArr.reduce((acc, obj) => {
      return acc + obj.price;
    }, total);
    setTotalPrice(total);
  }, [totalPrice, setTotalPrice]);

  return (
    <section className={`${styles.burgerConstructor} mt-25 pl-4`}>
      <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
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
            text={`${data[0].name} (низ)`}
            price={data[0].price}
            thumbnail={data[0].image}
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
            <OrderDetails value ={orderNum}/>
          </Modal>
        )}
      </TotalPriceContext.Provider>
    </section>
  );
};


export default BurgerConstructor;
