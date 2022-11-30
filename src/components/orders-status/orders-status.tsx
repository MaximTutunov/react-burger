import { useSelector } from "react-redux";
import style from "./orders-status.module.css";
import {FC} from 'react';
import {useTypedSelector} from '../../services/types';

const OrdersStatus:FC = () => {
     
    const { total, totalToday, orders } = useTypedSelector((store) => store.wsFeed);
 
  const doneStatusOrder = orders
    .filter((order) => order.status === "done")
    .filter((order, index) => index < 20);
    
  const pendingStatusOrder = orders
    .filter((order) => order.status === "pending")
    .filter((order, index) => index < 10);

  return (
    <div className={style.container}>
      <div className={`${style.ordercontainer} pb-15`}>
        <div className={style.column}>
          <p className=" pb-6 text_type_main-medium text">Готовы:</p>
          <ul className={style.list}>
            {doneStatusOrder.map((order) => {
              return (
                <li
                  className={`${style.item} ${style.done} text text_type_digits-default`}
                  key={order._id}
                >
                  {order.number}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={style.column}>
          <p className=" pb-6 text_type_main-medium text">В работе:</p>
          <ul className={style.list}>
            {pendingStatusOrder.map((order) => {
              return (
                <li
                  className={`${style.item} text text_type_digits-default`}
                  key={order._id}
                >
                  {order.number}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={`${style.completed} pb-15`}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <h2 className={`${style.total} text text_type_digits-large`}>
          {total}
        </h2>
      </div>
      <div className={style.completed}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <h2 className={`${style.total} text text_type_digits-large`}>
          {totalToday}
        </h2>
      </div>
    </div>
  );
};
export default OrdersStatus