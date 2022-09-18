import React from "react";
import { useState, useRef, useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsType } from "../ingredients-type/ingredients-type";
import styles from "./burger-ingredients.module.css";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/modal";
import { closeCurrentIngredient, openCurrentIngredient } from "../../services/actions";
import IngredientsDetails from "../ingredients-details/ingredients-details";

export default function BurgerIngredients() {

  const dispatch = useDispatch();
  
  const closeAllModals = () => {
    dispatch(closeCurrentIngredient());
  };

  const openModal = (ingredient) => {
    dispatch(openCurrentIngredient(ingredient));
  }
  const [current, setCurrent] = useState("bun");

  const { data, isModalOpen } = useSelector((store) => ({
    data: store.ingredients.data,
    isModalOpen: store.details.isModalOpen,
  }));

  const bunsSelection = useMemo(
    () => data.filter((element) => element.type === "bun"),
    [data]
  );
  const mainsSelection = useMemo(
    () => data.filter((element) => element.type === "main"),
    [data]
  );
  const saucesSelection = useMemo(
    () => data.filter((element) => element.type === "sauce"),
    [data]
  );

  const bunsRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const sectionRef = useRef(null);

  const autoTab = () => {
    const bunsDistance = Math.abs(
      sectionRef.current.getBoundingClientRect().top -
        bunsRef.current.getBoundingClientRect().top
    );
    const saucesDistance = Math.abs(
      sectionRef.current.getBoundingClientRect().top -
        sauceRef.current.getBoundingClientRect().top
    );
    const mainsDistance = Math.abs(
      sectionRef.current.getBoundingClientRect().top -
        mainRef.current.getBoundingClientRect().top
    );
    const minDistance = Math.min(bunsDistance, saucesDistance, mainsDistance);
    const currentTab =
      minDistance === bunsDistance
        ? "bun"
        : minDistance === saucesDistance
        ? "sauce"
        : "main";
    setCurrent((prevState) =>
      currentTab === prevState ? prevState : currentTab
    );
  };

  const onTabClick = (tab) => () => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="mr-10">
      <p className={`${styles.title} text text_type_main-large`}>
        Соберите бургер
      </p>
      <div className={`${styles.container} mt-5`}>
        <Tab active={current === "bun"} onClick={onTabClick("bun", bunsRef)}>
          Булки
        </Tab>
        <Tab
          active={current === "sauce"}
          onClick={onTabClick("sauce", sauceRef)}
        >
          Соусы
        </Tab>
        <Tab active={current === "main"} onClick={onTabClick("main", mainRef)}>
          Начинки
        </Tab>
      </div>
      <section className={styles.tabs} onScroll={autoTab} ref={sectionRef}>
        <>
          <IngredientsType
            openModal={openModal}
            id="bun"
            title="Булки"
            ingredients={bunsSelection}
            ref={bunsRef}
          />
          <IngredientsType
            openModal={openModal}
            id="sauce"
            title="Соусы"
            ingredients={saucesSelection}
            ref={sauceRef}
          />
          <IngredientsType
            openModal={openModal}
            id="main"
            title="Начинки"
            ingredients={mainsSelection}
            ref={mainRef}
          />
        </>
      </section>
      {isModalOpen && (
        <Modal title="Детали ингредиента" onClose={closeAllModals}>
          <IngredientsDetails />
        </Modal>
      )}
    </section>
  );
}
