import { useMemo, FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDrag } from "react-dnd";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./ingredient-item.module.css";
import {
  TIngredientsItems,
  TLocation,
  useTypedSelector,
} from "../../services/types";

export const IngredientItem: FC<TIngredientsItems> = ({ ingredient }) => {
  const location = useLocation<TLocation>();
  const { bun, items } = useTypedSelector((state) => state.burgerConstructor);
  const { image, name, price } = ingredient;
  const [{ opacity }, dragRef] = useDrag({
    type: "ingredients",
    item: { ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  const counter = useMemo(
    () =>
      (count = 0) => {
        for (let { _id } of items) if (_id === ingredient._id) count++;
        if (bun && bun._id === ingredient._id) return 2;
        return count;
      },
    [bun, items, ingredient._id]
  );

  return (
    <Link
      className={`${style.link}`}
      to={{
        pathname: `/ingredients/${ingredient._id}`,
        state: { background: location },
      }}
    >
      <div className={`${style.item} `} style={{ opacity }} ref={dragRef}>
        <img className={style.image} src={image} alt={name} />
        <div className={`${style.price} pt-1 pb-1`}>
          <p className="text text_type_digits-default pr-2">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${style.name} text text_type_main-default pb-10 pt-1`}>
          {name}
        </p>
        {counter() > 0 && <Counter count={counter()} size="default" />}
      </div>
    </Link>
  );
};
