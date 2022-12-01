import { Link, useLocation } from "react-router-dom";
import  OrdersCard  from "../../../components/orders-card/orders-card";
import style from "./orders-history.module.css";
import {TLocation, useTypedSelector } from "../../../services/types";
import {FC} from 'react'

const OrdersHistory:FC=()=> {
  const location = useLocation<TLocation>();
  const orders = useTypedSelector((store) => store.wsAuthFeed.orders);
  orders.reverse();

  return (
    <div className={style.container}>
      {orders &&
        orders?.map((order) => {
          return (
            <Link
              to={{
                pathname: `/profile/orders/${order._id}`,
                state: { background: location },
              }}
              className={`${style.link}`}
              key={order._id}
            >
              <OrdersCard order={order} status={order.status} />
            </Link>
          );
        })}
    </div>
  );
}
export default OrdersHistory