import { Link, useLocation } from "react-router-dom";
import OrdersCard from "../orders-card/orders-card";
import style from "./orders.module.css";
import { FC } from "react";
import { TLocation, useTypedSelector } from "../../services/types";

const Orders: FC = () => {
  const location = useLocation<TLocation>();
  const orders = useTypedSelector((store) => store.wsFeed.orders);
  return (
    <div className={style.container}>
      {orders &&
        orders.map((order, index) => {
          return (
            <Link
              to={{
                pathname: `/feed/${order._id}`,
                state: { background: location },
              }}
              className={`${style.link}`}
              key={order._id}
            >
              <OrdersCard order={order} status={order.status} key={index} />
            </Link>
          );
        })}
    </div>
  );
};
export default Orders;
