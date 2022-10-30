import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { OrdersCard } from "../../../components/orders-card/orders-card";
import style from "./orders-history.module.css";

export function OrdersHistory() {
  const location = useLocation();
  const orders = useSelector((store) => store.wsAuthFeed.orders);
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
              <OrdersCard order={order} status={true} />
            </Link>
          );
        })}
    </div>
  );
}
