import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import {
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  Register,
  ResetPassword,
} from "../../pages";
import AppHeader from "../app-header/app-header";
import { getUser, updateToken } from "../../services/actions/authAction";
import { ProtectedRoute } from "../protectedroute/ProtectedRoute";
import { getCookie } from "../../utils/cookie";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import Modal from "../modal/modal";
import { getBurgerIngredients } from "../../services/actions/ingredientsAction";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import style from "./app.module.css";
import { closeOrderModal } from "../../services/actions/orderAction";
import { closeIngredientModal } from "../../services/actions/detailsAction";
import { RESET_INGREDIENT } from "../../services/actions/constructorAction";

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const background = location.state?.background;
  const token = localStorage.getItem("refreshToken");
  const orderNumberModal = useSelector((state) => state.order.number);
  const isLoading = useSelector((state) => state.burgerIngredients.isLoading);
  const hasError = useSelector((state) => state.burgerIngredients.hasError);
  const cookie = getCookie("token");
  const handleCloseModalIngredient = useCallback(() => {
    dispatch(closeIngredientModal());
    history.replace("/");
  }, [dispatch]);
  const handleCloseModalOrder = useCallback(() => {
    dispatch(closeOrderModal());
    dispatch({ type: RESET_INGREDIENT });
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
    <div className={style.page}>
      <AppHeader />
      <>
        <Switch location={background || location}>
          <Route path="/" exact>
            <main className={style.content}>
              {isLoading && <div className={style.ring} />}
              {hasError && "Ошибка. Попробуйте еще  раз!"}
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

          <Route path='/feed' exact = 'true'>
            <Feed />
          </Route>

          <Route path='/feed/:id' exact = 'true'>
            <OrderInfo />
          </Route>

          <ProtectedRoute path="/profile" exact>
            <Profile />
          </ProtectedRoute>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>

{/** */}

        {background && (
          <Route path="/ingredients/:id" exact>
            <Modal
              description="Детали ингредиента"
              closeModal={handleCloseModalIngredient}
            >
              <IngredientDetails />
            </Modal>
          </Route>
        )}
      </>
      {orderNumberModal && (
        <Modal description="Детали заказа" closeModal={handleCloseModalOrder}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}
