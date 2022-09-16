import React, {useRef} from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useCallback, useEffect, useState } from "react";
import styles from "./app.module.css";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "../../services/reducers/index";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/index";



function App() {
  const {  data, dataRequest, dataFailed } = useSelector((store) => ({
    
    data: store.ingredients.data,
    dataRequest: store.ingredients.dataRequest,
    dataFailed: store.ingredients.dataFailed,
  }));

  const dispatch = useDispatch();

const fetchRan = useRef(false);

useEffect( ()=> {
  if(fetchRan.current === false) {
    dispatch(getIngredients());
  }
  return ()=> {fetchRan.current = true};
}, [dispatch])
/*
  useEffect(() => {
    dispatch(getData());
    
  }, [dispatch]);*/



  return (
    <div className={styles.app}>
      <AppHeader />

      <main className={`${styles.main} pl-5`}>
        {dataRequest && "Загрузка..."}
        {dataFailed && "Ошибка"}
        {!dataRequest && !dataFailed && (
          <>
          <BurgerIngredients  />
          {/*<BurgerConstructor  />*/}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
