import { useMemo } from "react";
import { useSelector } from "react-redux";
import uniqid from "uniqid";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import propTypes from "prop-types";
import { OrderImage } from "../order-image/order-image";
import {FC} from 'react';
import style from "./order-info-details.module.css";
import {TOrderInfoDetails, useTypedSelector} from '../../services/types';

export const OrderInfoDetails:FC<TOrderInfoDetails> = ({ details }) => {
  const ingredients = useTypedSelector(
    (store) => store.burgerIngredients.ingredients
  );

  const count = (elem:object) => {
    let count = details.filter((item) => {
      return item === elem;
    }).length;
    return count;
  };

  const orderIngredient = useMemo(() => {
    return details?.map((elem) => {
      return ingredients?.find((item) => {
        return elem._id === item._id;
      });
    });
  }, [details, ingredients]);

  return (
    <div className={style.container}>
      {orderIngredient &&
        [...new Set(orderIngredient)].map((item) => {
          return (
            <li
              className={`${style.item} pb-3`}
              key={item._id}
            >
              {item && (
                <>
                  <div className={style.info}>
                    <OrderImage
                      image={item.image}
                      alt={item.name}
                      key={item._id}
              />
                    <p
                      className={`${style.text} text text_type_main-default pl-4`}
                    >
                      {item.name}
                    </p>
                  </div>
                  <div className={style.price}>
                    <p className="text text_type_digits-default pr-2">

                      {item.type === "bun"
                        ? `${count(item) * 2} x ${item.price}`
                        : `${count(item)} x ${item.price}`}
                    </p>
                    <CurrencyIcon type="primary"  />
                  </div>
                </>
              )}
            </li>
          );
        })}
    </div>
  );
};

OrderInfoDetails.propTypes = {
  details: propTypes.array.isRequired,
};
export default OrderInfoDetails