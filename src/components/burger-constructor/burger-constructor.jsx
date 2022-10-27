import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { getCookie } from "../../utils/cookie";
import BurgerConstructorItems from "../burger-constructor-items/burger-constructor-items";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getOrderDetails } from "../../services/actions/orderAction";
import {
  ADD_BUN,
  ADD_INGREDIENT_CONSTRUCTOR,
} from "../../services/actions/constructorAction";
import style from "./burger-constructor.module.css";

export default function BurgerConstructor() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const { bun, items } = useSelector((state) => state.burgerConstructor);
  const cookie = getCookie("token");
  const filling = useMemo(
    () => items.filter((item) => item.type !== "bun"),
    [items]
  );
  const itemsId = useMemo(() => items.map((item) => item._id), [items]);
  const orderDetailsModal = (itemsId) => {
    cookie && dispatch(getOrderDetails(itemsId));
    !cookie && history.push("/login");
  };
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
    <section className={`${style.section} pt-25 ml-10`}>
      <div className={`${style.container}`} ref={dropTarget}>
        {bun.length === 0 ? (
          <p
            className={`${style.buninitial} text text_type_main-large pr-2 text_color_inactive`}
          >
            Перенесите булочку
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
            className={`${style.maininitial} ${style.listmain} ${style.text} pr-2 text text_type_main-large text_color_inactive`}
          >
            Перенесите начинку
          </p>
        ) : (
          <ul className={`${style.list} pr-4`}>
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
            className={`${style.buninitial} text text_type_main-large pr-2 text_color_inactive`}
          >
            Перенесите булочку
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
      <div className={`${style.total} pt-10 pr-4 pb-10`}>
        <div className={`${style.sum} pr-10`}>
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
