import React from "react";
import { ArrayPropTypes } from "../../utils/proptypes";
import { useState, useRef, useMemo } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsType } from "../ingredients-type/ingredients-type";
import styles from "./burger-ingredients.module.css";
import {useSelector} from 'react-redux';

export default function BurgerIngredients() {
  const [current, setCurrent] = useState("bun");
  
  const { data } = useSelector(store => ({
    data: store.ingredients.data
  }));

  const bunsArray = useMemo(()=> data.filter((element) => element.type === "bun"), [data]);
  const mainArray = useMemo(()=> data.filter((element) => element.type === "main"), [data]);
  const sauceArray = useMemo(()=> data.filter((element) => element.type === "sauce"), [data]);

  

  const bunsRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);


 

  
const onTabClick = (tab, categoryRef) => () => {
  setCurrent(tab);
  const el = document.getElementById(tab);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

  return (
    <section className="mr-10">
      <p className="text text_type_main-large">Соберите бургер</p>
      <div className={`${styles.container} mt-5`}>
        <Tab active={current === "bun"} onClick={onTabClick("bun", bunsRef)}>
          Булки
        </Tab>
        <Tab active={current === "sauce"} onClick={onTabClick("sauce", sauceRef)}>
          Соусы
        </Tab>
        <Tab active={current === "main"} onClick={onTabClick("main", mainRef)}>
          Начинки
        </Tab>
      </div>
      <section className={styles.tabs} >
        <>
          <IngredientsType id="bun" title="Булки" ingredients={bunsArray} ref={bunsRef}/>
          <IngredientsType id="sauce" title="Соусы" ingredients={sauceArray} ref={sauceRef}/>
          <IngredientsType id="main" title="Начинки" ingredients={mainArray}  ref={mainRef}/>
        </>
      </section>
    </section>
  );
}

