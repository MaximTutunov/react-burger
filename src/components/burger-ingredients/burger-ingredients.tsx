import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredients from "../ingredients/ingredients";
import style from "./burger-ingredients.module.css";

export default function BurgerIngredients () {
  const [current, setCurrent] = useState("bun");
  const ingredients = useSelector(store => store.burgerIngredients.ingredients)
  const [bunRef, bunView] = useInView({
		threshold: 0.1
	});
  const [mainRef, mainView] = useInView({
		threshold: 0.1
	});
	const [sauceRef, sauceView] = useInView({
		threshold: 0.1
	});
  const scrollTabClick = (e) => {
		setCurrent(e);
		const section = document.getElementById(e);
		section.scrollIntoView({ behavior: "smooth", block: "start" });
	};

  const handleIngredientScroll = () => {
		switch (true) {
			case bunView:
				setCurrent('bun');
				break;
			case sauceView:
				setCurrent('sauce');
				break;
			case mainView:
				setCurrent('main');
				break;
			default:
				break;
		}
	};

  useEffect(() => {
		handleIngredientScroll();
	}, [bunView, sauceView, mainView]);

  return (
    <section className={`${style.section} mt-10 pl-5`}>
      <h1
        className={`${style.title} text text_type_main-large mb-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${style.category} mb-5`}>
        <Tab
          active={current === "bun"}
          onClick={(e) => scrollTabClick(e)}
          value="bun"
        >
          Булки
        </Tab>

        <Tab
          active={current === "sauce"}
          onClick={(e) => scrollTabClick(e)}
          value="sauce"
        >
          Соусы
        </Tab>

        <Tab
          active={current === "main"}
          onClick={(e) => scrollTabClick(e)}
          value="main"
        >
          Начинки
        </Tab>
      </div>

      <ul className={`${style.ingredients} pt-5`}>
        <Ingredients
          ingredients={ingredients}
          type="bun"
          tabRef={bunRef}
        />
        <Ingredients
          ingredients={ingredients}
          type="sauce"
          tabRef={sauceRef}
        />
        <Ingredients
          ingredients={ingredients}
          type="main"
          tabRef={mainRef}
        />
      </ul>
    </section>
  );
}
