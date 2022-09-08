import React from "react";
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getData } from '../../utils/api';
import { useCallback, useEffect, useState } from 'react';
import styles from './app.module.css';

function App () {
  const [state, setLoadingState] = useState({
    data: [],
    isLoading: true,
    hasError: false,
  });

  const getIngredients = useCallback((state) => {
    setLoadingState({ ...state, isLoading: true, hasError: false});
    getData()
      .then((obj) =>
        setLoadingState({ ...state, data: obj.data, isLoading: false })
      )
      .catch((error) => {
        setLoadingState({ ...state, isLoading: false, hasError: true,  });
      });
  }, []);

  useEffect(() => {
    getIngredients();
  }, []);

    return (
      <div className={styles.app}>
        <AppHeader />
        <main className={`${styles.main} pl-5`}>
          {state.isLoading && "Загрузка..."}
          {state.hasError && "Ошибка"}
          {!state.isLoading && !state.hasError && (
            <>
              <BurgerIngredients data={state.data} />
              <BurgerConstructor data={state.data} />
            </>
          )}
        </main>
      </div>
    )
}

export default App;
