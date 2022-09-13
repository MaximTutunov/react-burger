import React from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getData } from "../../utils/api";
import { useCallback, useEffect, useState } from "react";
import styles from "./app.module.css";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../../services/reducers/index";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/index";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);

function App() {
  const { data, dataRequest, dataFailed } = useSelector((store) => ({
    data: store.ingredients.data,
    dataRequest: store.ingredients.dataRequest,
    dataFailed: store.ingredients.dataFailed,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <main className={`${styles.main} pl-5`}>
        {dataRequest && "Загрузка..."}
        {dataFailed && "Ошибка"}
        {!dataRequest && !dataFailed && (
          <>
            <BurgerIngredients  />
            <BurgerConstructor  />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
