import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useRouteMatch } from "react-router-dom";
import { OrderInfoDetails } from "../order-info-details/order-info-details";
import { formatDate } from "../../utils/cookie";
import uniqid from "uniqid";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import {
  wsConnectionClosed,
  wsConnectionOpen,
} from "../../services/actions/wsAction";
import {
  wsAuthConnectionClosed,
  wsAuthConnectionOpen,
} from "../../services/actions/wsAuthAction";
import style from "./order-info.module.css";

export const OrderInfo = () => {
  const dispatch = useDispatch();
  let match = useRouteMatch();
  const isProfile = "/profile/orders/:id";
  const isFeed = "/feed/:id";
  let { id } = useParams();
  const allOrders = useSelector((store) => store.wsFeed.orders);
  const authorizationOrders = useSelector((store) => store.wsAuthFeed.orders);
  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );
  let orders = match.path === isProfile ? authorizationOrders : allOrders;
  let order = orders?.find((order) => order._id === id);

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

  useEffect(() => {
    if (!order) {
      if (match.path === isProfile) {
        dispatch(wsAuthConnectionOpen());
      }
      if (match.path === isFeed) {
        dispatch(wsConnectionOpen());
      }
    }
    return () => {
      if (match.path === isProfile) {
        dispatch(wsAuthConnectionClosed());
      }
      if (match.path === isFeed) {
        dispatch(wsConnectionClosed());
      }
    };
  }, [dispatch, order, match.path, match.url]);

  return (
    <>
      {order && (
        <div className={style.container}>
          <p className="text text_type_digits-default">#{order.number}</p>
          <h2 className={`${style.name} text text_type_main-medium pt-10`}>
            {order.name}
          </h2>
          {!!order.status && (
            <p className={`${style.status} text text_type_main-default pt-3`}>
              {order.status === "done"
                ? "Выполнен"
                : order.status === "pending"
                ? "Готовится"
                : order.status === "created"
                ? "Создан"
                : "Выполнен"}
            </p>
          )}
          <h3 className={`${style.order} text text_type_main-medium pt-15`}>
            Состав:
          </h3>
          <ul className={`${style.list}`}>
            <OrderInfoDetails details={orderIngredientsData} key={id} />
          </ul>
          <div className={`${style.total} pb-10`}>
            <p className="text text_type_main-default text_color_inactive">
              {formatDate(order.createdAt)}
            </p>
            <div className={style.price}>
              <p className="text text_type_digits-default pr-2">
                {orderTotalPrice}
              </p>
              <CurrencyIcon type="primary" key={uniqid()} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
