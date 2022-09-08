import React from "react";
import { ArrayPropTypes } from "../../utils/proptypes";
import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsType } from "../ingredients-type/ingredients-type";
import styles from "./burger-ingredients.module.css";

export default function BurgerIngredients({ data }) {
  const [current, setCurrent] = useState("bun");
  const bunsArray = data.filter((element) => element.type === "bun");
  const mainArray = data.filter((element) => element.type === "main");
  const sauceArray = data.filter((element) => element.type === "sauce");

  const onTabClick = (tab) => () => {
    setCurrent(tab);
    document.getElementById(tab).scrollIntoView({ behavior: "auto" });
  };

  return (
    <section className="mr-10">
      <p className="text text_type_main-large">Соберите бургер</p>
      <div className={`${styles.container} mt-5`}>
        <Tab active={current === "bun"} onClick={onTabClick("bun")}>
          Булки
        </Tab>
        <Tab active={current === "sauce"} onClick={onTabClick("sauce")}>
          Соусы
        </Tab>
        <Tab active={current === "main"} onClick={onTabClick("main")}>
          Начинки
        </Tab>
      </div>
      <section className={styles.tabs}>
        <>
          <IngredientsType id="bun" title="Булки" ingredients={bunsArray} />
          <IngredientsType id="sauce" title="Соусы" ingredients={sauceArray} />
          <IngredientsType id="main" title="Начинки" ingredients={mainArray} />
        </>
      </section>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: ArrayPropTypes,
};
