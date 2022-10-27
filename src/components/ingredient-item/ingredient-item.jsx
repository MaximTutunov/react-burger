import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useDrag } from "react-dnd";
import { openIngredientModal } from "../../services/actions/detailsAction";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientType from "../../utils/types";
import style from "./ingredient-item.module.css";

export default function IngredientItem({ ingredient }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { bun, items } = useSelector((state) => state.burgerConstructor);
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

  const handleOpenIngredientModal = (ingredient) => {
    dispatch(openIngredientModal(ingredient));
  };

  return (
    <Link
      className={`${style.link}`}
      to={{
        pathname: `/ingredients/${ingredient._id}`,
        state: { background: location },
      }}
      onClick={() => handleOpenIngredientModal(ingredient)}
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
}

IngredientItem.protoType = {
  ingredient: ingredientType.isRequired,
};
