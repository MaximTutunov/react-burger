import React, { useRef } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useEffect } from "react";
import styles from "./app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/index";
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';


function App() {
  const dispatch = useDispatch();
  
  const isLoading = useSelector((state) => state.burgerIngredients.isLoading);
  const hasError = useSelector((state) => state.burgerIngredients.hasError);

  const location = useLocation();
  const history = useHistory();
  const background = location.state?.background;
  const token = localStorage.getItem("refreshToken");
  const cookie = getCookie("token");


  const handleCloseOrderModal = useCallback(() => {
    dispatch(closeOrderModal());
    dispatch({ type: RESET_INGREDIENT });
  }, [dispatch]);

  const handleCloseIngredientModal = useCallback(() => {
    dispatch(closeIngredientModal());
    history.replace("/");
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBurgerIngredients());
   }, [dispatch]);


  useEffect(() => {
    if (!cookie && token) {
      dispatch(updateToken());
    }
    if (cookie && token) {
      dispatch(getUser());
    }
  }, [dispatch, token, cookie]);

  return (
    <div className={Appstyle.page}>
      <AppHeader />
      <>
        <Switch location={background || location}>
          <Route path="/" exact>
            <main className={AppStyle.content}>
              {isLoading && <div className={AppStyle.loader} />}
              {hasError && "Что-то пошло не так...( Попробуйте позже!"}
              {!isLoading && !hasError && (
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </DndProvider>
              )}
            </main>
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/forgot-password" exact>
            <ForgotPassword />
          </Route>
          <Route path="/reset-password" exact>
            <ResetPassword />
          </Route>
        
          <Route path="/ingredients/:id" exact={true}>
            <IngredientDetails />
          </Route>
          <ProtectedRoute path="/profile">
            <Profile />
          </ProtectedRoute>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>
        
        {background && (
          <Route path="/ingredients/:id" exact>
            <Modal
              description="Детали ингредиента"
              closeModal={handleCloseIngredientModal}
            >
              <IngredientDetails />
            </Modal>
          </Route>
        )}
      </>
      {orderNumberModal && (
        <Modal description="Детали заказа" closeModal={handleCloseOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default App;
