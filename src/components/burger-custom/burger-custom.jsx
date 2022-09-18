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

export default function BurgerCustom({ item, index, handleClose }) {
  const ref = useRef();
  const dispatch = useDispatch();

  const [{ isDrag }, drag] = useDrag({
    type: "item",
    item: { index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const opacity = isDrag ? 0.6 : 1;

  const [, drop] = useDrop({
    accept: "item",
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;

      dispatch({
        type: UPDATE_ITEMS,
        fromIndex: dragIndex,
        toIndex: hoverIndex,
      });
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <li className={`${styles.item} pb-4 pr-2`} ref={ref} style={{ opacity }}>
      <div className="mr-2">
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleClose()}
        index={index}
      />
    </li>
  );
}

BurgerCustom.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
};
