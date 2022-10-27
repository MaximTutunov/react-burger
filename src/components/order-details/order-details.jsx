import { useSelector } from "react-redux";
import acceptedImg from "../../images/AcceptedIcon.svg";
import style from "./order-details.module.css";
export default function OrderDetails () {
  const orderNumber = useSelector((store) => store.order.number);
  return (
   <div className={`${style.container} pl-25 pr-25`}>
      <h2
        className={`${style.title} text text_type_digits-large pt-15 pb-8`}
      >
        {orderNumber}
      </h2>
      <p
        className={`${style.text} text text_type_main-medium pb-15`}
      >
        идентификатор заказа
      </p>
      <img
        className={`${style.icon} pb-15`}
        src={acceptedImg}
        alt={acceptedImg}
      />
      <p
        className={`${style.text} text text_type_main-default pb-2`}
      >
        Ваш заказ начали готовить
      </p>
      <p
        className={`${style.text} text text_type_main-default text_color_inactive pb-30`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}