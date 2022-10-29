import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderImage } from "../order-image/order-image";
import { formatDate } from "../../utils/cookie";
import propTypes from "prop-types";
import style from "./orders-card.module.css";

export const OrdersCard = ({ order, status }) => {
  const { createdAt, number, name } = order;
  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );
  const orderIngredientsData = useMemo(() => {
    return order?.ingredients.map((id) => {
      return ingredients?.find((item) => {
        return id === item._id;
      });
    });
  }, [order?.ingredients, ingredients]);

  const orderTotalPrice = useMemo(() => {
    return orderIngredientsData?.reduce((sum, item) => {
      if (item?.type === "bun") {
        return (sum += item.price * 2);
      }
      return (sum += item ? item.price : 0);
    }, 0);
  }, [orderIngredientsData]);
  const maxLength = order.ingredients.length;
  const hideItems = maxLength - 6;

  return (
    <div className={style.container}>
      <div className={style.order}>
        <p className="text_type_digits-default text">#{number}</p>
        <p className="text_type_main-default text_color_inactive text">
          {formatDate(createdAt)}
        </p>
      </div>
      <div className={style.info}>
        <h2 className={`${style.text} text text_type_main-medium`}>{name}</h2>
        {!!status && (
          <p className={`${style.status} text text_type_main-default`}>
            {status === "done"
              ? "Выполнен"
              : status === "pending"
              ? "Готовится"
              : status === "created"
              ? "Создан"
              : "Выполнен"}
          </p>
        )}
      </div>
      <div className={style.price}>
        <ul className={style.list}>
          {orderIngredientsData &&
            maxLength <= 5 &&
            orderIngredientsData.map((item, index) => {
              return (
                <li className={style.items} key={index}>
                  {item && (
                    <OrderImage image={item.image} alt={item.name} />
                  )}
                </li>
              );
            })}
          {orderIngredientsData &&
            maxLength >= 6 &&
            orderIngredientsData.slice(0, 5).map((item, index) => {
              return (
                <li className={style.items} key={index}>
                  {item && (
                    <OrderImage image={item.image} alt={item.name} />
                  )}
                </li>
              );
            })}
          {orderIngredientsData &&
            maxLength > 6 &&
            orderIngredientsData.slice(5, 6).map((item, index) => {
              return (
                <li className={style.items} key={index}>
                  {item && (
                    <>
                      <p
                        className={`${style.hideText} text text_type_main-default`}
                      >{`+${hideItems}`}</p>
                      <div className={style.hideImage}>
                        <OrderImage
                          image={item.image}
                          alt={item.name}
                        />
                      </div>
                    </>
                  )}
                </li>
              );
            })}
        </ul>
        <div className={style.price}>
          <p className="pr-2 text_type_digits-default text">
            {orderTotalPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

OrdersCard.propTypes = {
  order: propTypes.object.isRequired,
  status: propTypes.bool,
};