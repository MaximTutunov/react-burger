import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
} from "../../services/actions/constructorAction";
import ingredientType from "../../utils/types";
import style from "./burger-constructor-items.module.css";


export default function BurgerConstructorItems  ({ index, items })  {
  const dispatch = useDispatch();
  const { image, id, price, name } = items;
  const ref = useRef(null);

  const onDelete = (id) => {
    dispatch({
      type: DELETE_INGREDIENT,
      id: id,
    });
  };

  const [{ opacity }, drag] = useDrag({
    type: "item",
    item: { id, index },
    collect: (monitor) => {
      return {
        opacity: monitor.isDragging() ? 0.5 : 1,
      };
    },
  });

  const [, drop] = useDrop({
    accept: "item",
    hover(items) {
      if (!ref.current) {
        return;
      }
      const dragIndex = items.index;
      const hoverIndex = index;
      dispatch({
        type: MOVE_INGREDIENT,
        data: { dragIndex, hoverIndex },
      });
      items.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <li
      className={`${style.item} pt-4 pr-3`}
      style={{ opacity }}
      ref={ref}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => onDelete(id)}
      />
    </li>
  );
};

BurgerConstructorItems.protoType = {
  items: ingredientType.isRequired,
  index: ingredientType.isRequired,
};


