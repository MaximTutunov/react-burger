import { useEffect, useMemo, useState, FC } from "react";
import { useHistory } from "react-router-dom";
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
import { TIngredients } from "../../services/types";
import { useTypedSelector, useTypedDispatch } from "../../services/types";

interface DropItem {
  ingredient: TIngredients;
}

const BurgerConstructor: FC = () => {
  const history = useHistory();
  const dispatch = useTypedDispatch();
  const [total, setTotal] = useState(0);

  const { bun, items, itemsId } = useTypedSelector(
    (state) => state.burgerConstructor
  );
  const { orderDetailsRequest } = useTypedSelector((state) => state.order);

  const cookie = getCookie("token");

  const filling = useMemo(
    () => items.filter((item) => item.type !== "bun"),
    [items]
  );

  const orderDetailsModal = (itemsId: string[]) => {
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
    drop(item: DropItem) {
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
            key={bun._id}
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
        {bun.name.length === 0 ? (
          <p
            className={`${style.buninitial} text text_type_main-large pr-2 text_color_inactive`}
          >
            Перенесите булочку
          </p>
        ) : (
          <ConstructorElement
            key={`bottom: ${bun._id}`}
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
        {items.length === 0 || !!orderDetailsRequest ? (
          <Button
            type="primary"
            size="large"
            onClick={() => {
              orderDetailsModal(itemsId);
            }}
            disabled
            htmlType="button"
          >
            {orderDetailsRequest ? (
              <div className={style.loader} />
            ) : (
              "Оформить заказ"
            )}
          </Button>
        ) : (
          <Button
            type="primary"
            size="large"
            onClick={() => {
              orderDetailsModal(itemsId);
            }}
            htmlType="button"
          >
            Оформить заказ
          </Button>
        )}
      </div>
    </section>
  );
};

export default BurgerConstructor;
