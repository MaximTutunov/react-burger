import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { OrdersStatus } from "../../components/orders-status/orders-status";
import { Orders } from "../../components/orders/orders";
import {
    wsConnectionClosed,
    wsConnectionOpen,
  } from "../../services/actions/wsAction";
import style from "./feed.module.css";

export const Feed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionOpen());
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  return (
    <div className={style.container}>
      <h2 className={`${style.text} pb-5 pt-10 text text_type_main-large`}>
        Лента заказов
      </h2>
      <div className={style.orders}>
        <Orders />
        <OrdersStatus />
      </div>
    </div>
  );
};
