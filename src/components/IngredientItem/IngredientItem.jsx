import React, { useRef } from "react";
import styles from "../burger-constructor/burger-constructor.module.css";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { UPDATE_ITEMS } from "../../services/actions";
import PropTypes from "prop-types";

const IngredientItem = ({ ingredient }) => {
	const location = useLocation();

  const { bun, items } = useSelector((state) => state.burgerConstructor);
  const dispatch = useDispatch();
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
        for (let { _id } of items)

        if (_id === ingredient._id) count++;

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
      className={`${ingredientItemStyles.link}`}
			to={{ pathname: `/ingredients/${ingredient._id}`, state: { background: location } }}
      onClick={() => handleOpenIngredientModal(ingredient)}
    >
    <div
      className={`${ingredientItemStyles.item} `}
      style={{ opacity }}
      ref={dragRef}
    >
      <img className={ingredientItemStyles.image} src={image} alt={name} />
      <div className={`${ingredientItemStyles.price} pt-1 pb-1`}>
        <p className="text text_type_digits-default pr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p
        className={`${ingredientItemStyles.name} text text_type_main-default pb-10 pt-1`}
      >
        {name}
      </p>
      {counter() > 0 && <Counter count={counter()} size="default" />}
    </div>
    </Link>
  );
};

IngredientItem.protoType = {
  ingredient: ingredientType.isRequired,
};

export default IngredientItem;
