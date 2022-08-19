import React from 'react';
import { useCallback, useState, useEffect } from 'react';
import appstyles from './app.module.css';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';

import {fetchData} from '../../utils/api'

const App =() => {
    return(
    <div className ={appstyles.app__template}>
        <AppHeader />
      {/* <BurgerIngredients />
       <BurgerConstructor />*/}
    </div>
    );
}

export default App;