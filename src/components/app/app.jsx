import React from "react";
import { useCallback, useState, useEffect } from "react";
import appstyles from "./app.module.css";
import AppHeader from "../app-header/AppHeader";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";

import { fetchData } from "../../utils/api";


const App = () => {
  const [state, setFetchedState] = useState({
    data: [],
    isLoading: true,
    hasError: false,
  });

  const getIngredients = useCallback((state) => {
    setFetchedState({ ...state, isLoading: true, hasError: false });
    fetchData().then((obj) =>
      setFetchedState({ ...state, data: obj.data, isLoading: false })
    );
  }).catch((err) => {
    setFetchedState({ ...state, isLoading: false, hasError: true });
  },[]);

useEffect(() =>{
    getIngredients();
}, [])

  return (
    <div className={appstyles.app__template}>
      <AppHeader />
      <main className={`${appstyles.main} pl-5`}>
        {state.isLoading && 'Загрузка...'}
        {state.hasError && 'Произошла ошибка'}
        {!state.isLoading && !state.hasError &&
        (<>      
      <BurgerIngredients data = {state.data} />
       <BurgerConstructor data = {state.data}/>
       </>
        )}
       </main>
    </div>
  );
};

export default App;
