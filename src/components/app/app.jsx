import React, { useRef } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useEffect } from "react";
import styles from "./app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/index";

function App() {
  const { dataRequest, dataFailed } = useSelector((store) => ({
    dataRequest: store.ingredients.dataRequest,
    dataFailed: store.ingredients.dataFailed,
  }));
  const dispatch = useDispatch();
  const fetchRan = useRef(false);
  useEffect(() => {
    if (fetchRan.current === false) {
      dispatch(getIngredients());
    }
    return () => {
      fetchRan.current = true;
    };
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pl-5`}>
        {dataRequest && "Загрузка..."}
        {dataFailed && "Ошибка"}
        {!dataRequest && !dataFailed && (
          <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
