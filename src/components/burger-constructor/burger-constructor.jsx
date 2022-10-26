import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import React, { useState } from "react";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { getOrderNum, onDropHandler, deleteItem } from "../../services/actions";
import { useDrop } from "react-dnd/dist/hooks/useDrop";
import BurgerCustom from "../burger-custom/burger-custom";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const cookie = getCookie('token');
	const history = useHistory();

  const { bun, items } = useSelector((state) => state.burgerConstructor);

  const filling = useMemo(
    () => items.filter((item) => item.type !== "bun"),
    [items]
  );
  const itemsId = useMemo(() => items.map((item) => item._id), [items]);



  const orderDetailsModal = (itemsId) => {
		cookie && dispatch(getOrderDetails(itemsId));
		!cookie && history.push('/login');
	};

  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    const totalPrice = filling.reduce(
      (sum, item) => sum + item.price,
      bun.length === 0 ? 0 : bun.price * 2
    );
    setTotal(totalPrice);
  }, [bun, filling]);


  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop(item) {
      if (item.ingredient.type === "bun") {
        dispatch({
          type: ADD_BUN,
          data: item.ingredient,
        });
      } else {
        dispatch({
          type: ADD_INGREDIENT_CONSTRUCTOR,
          data: { ...item.ingredient, id: Date.now() },
        });
      }
    },
  });

  return (
   <section className={`${burgerConstructorStyles.section} pt-25 ml-10`}>
      <div className={`${burgerConstructorStyles.container}`} ref={dropTarget}>
        {bun.length === 0 ? (
          <p
            className={`${burgerConstructorStyles.instructionbun} text text_type_main-large pr-2 text_color_inactive`}
          >
            Перетащите булочку сюда
          </p>
        ) : (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + "(верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}

        {items.length === 0 ? (
          <p
            className={`${burgerConstructorStyles.instructionmain} ${burgerConstructorStyles.listmain} ${burgerConstructorStyles.text} pr-2 text text_type_main-large text_color_inactive`}
          >
            Перетащите начинку сюда
          </p>
        ) : (
          <ul className={`${burgerConstructorStyles.list} pr-4`}>
            {items.map((element, index) => {
              if (element.type === "sauce" || element.type === "main") {
                return (
                  <BurgerConstructorItems
                    key={element.id}
                    items={element}
                    index={index}
                  />
                );
              }
              return null;
            })}
          </ul>
        )}
        {bun.length === 0 ? (
          <p
            className={`${burgerConstructorStyles.instructionbun} text text_type_main-large pr-2 text_color_inactive`}
          >
            Перетащите булочку сюда{" "}
          </p>
        ) : (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + "(низ)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </div>
      <div className={`${burgerConstructorStyles.total} pt-10 pr-4 pb-10`}>
        <div className={`${burgerConstructorStyles.summ} pr-10`}>
          <p className="text text_type_digits-medium pr-2">{total}</p>
          <CurrencyIcon type="primary" />
        </div>
        {items.length === 0 ? (
          <Button
            type="primary"
            size="large"
            onClick={() => {
              orderDetailsModal(itemsId);
            }}
            disabled
          >
            Оформить заказ
          </Button>
        ) : (
          <Button
            type="primary"
            size="large"
            onClick={() => {
              orderDetailsModal(itemsId);
            }}
          >
            Оформить заказ
          </Button>
        )}
      </div>
    </section>
  );
}
