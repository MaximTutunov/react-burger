import styles from "./order-details.module.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function OrderDetails(props) {
  const { order, orderNumRequest, orderNumFailed } = useSelector((store) => ({
    order: store.ingredients.order,
    orderNumRequest: store.ingredients.orderNumRequest,
    orderNumFailed: store.ingredients.orderNumFailed,
  }));
  return (
    <>
    {!orderNumRequest && !order && (
        <p className={`${styles.subtitle} text text_type_main-medium`}>
          Соберите, пожалуйста, бургер полностью
        </p>
      )}
      {orderNumRequest && (
        <p className={`${styles.subtitle} text text_type_main-medium`}>
          Идет отправка Вашего заказа на кухню
        </p>
      )}

      {orderNumFailed && (
        <p className={`${styles.subtitle} text text_type_main-medium`}>
         Возникла ошибка. Попробуйте еще раз, пожалуйста!
        </p>
      )}
    {!orderNumRequest && !orderNumFailed && order &&(<>
      <p className={`${styles.title} text text text_type_digits-large`}>
        {props.value}
      </p>
      <p className={`${styles.subtitle} text text_type_main-medium`}>
        идентификатор заказа
      </p>
      <div className={styles.check}></div>
      <p className={`${styles.text} text text_type_main-default`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`${styles.text} text text_type_main-default text_color_inactive`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </>)}
    </>
  );
}

OrderDetails.propTypes = {
  value: PropTypes.number,
};
