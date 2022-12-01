import { useEffect, useCallback, FC } from "react";
import { TLocation } from "../../services/types";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import {
  Switch,
  Route,
  useLocation,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import {
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  Register,
  ResetPassword,
  Feed,
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
import { OrderInfo } from "../order-info/order-info";
import { closeOrderInfoModal } from "../../services/actions/orderInfoModCloseAction";
import {useTypedSelector, useTypedDispatch} from '../../services/types';

const App: FC =()=>{
  const dispatch = useTypedDispatch();
  const location = useLocation<TLocation>();
  const history = useHistory();
  const background = location.state?.background;
  const token = localStorage.getItem("refreshToken");
  const orderNumberModal = useTypedSelector((state) => state.order.number);
  const isLoading = useTypedSelector((state) => state.burgerIngredients.isLoading);
  const hasError = useTypedSelector((state) => state.burgerIngredients.hasError);
  const cookie = getCookie("token");

  const idOrderInfo = useRouteMatch<{[id:string]:string}|null>(["/profile/orders/:id", "/feed/:id"])
    ?.params?.id;

  const handleCloseModalIngredient = useCallback(() => {
    dispatch(closeIngredientModal());
    history.replace("/");
  }, [dispatch]);

  const handleCloseModalOrder = useCallback(() => {
    dispatch(closeOrderModal());
    dispatch({ type: RESET_INGREDIENT });
  }, [dispatch]);

  const handleCloseOrderInfoModal = useCallback(() => {
    dispatch(closeOrderInfoModal());
    history.goBack();
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
            {isLoading && <div className={style.loader} />}
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

        <Route path="/ingredients/:id" exact>
          <IngredientDetails />
        </Route>

        <Route path="/feed" exact>
          <Feed />
        </Route>
        <Route path="/feed/:id" exact>
          <OrderInfo />
        </Route>

        <ProtectedRoute path="/profile">
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id">
          <OrderInfo />
        </ProtectedRoute>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>

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
      {background && idOrderInfo && (
        <ProtectedRoute path="/profile/orders/:id" exact>
          <Modal description="" closeModal={handleCloseOrderInfoModal}>
            <OrderInfo />
          </Modal>
        </ProtectedRoute>
      )}
      {background && idOrderInfo && (
        <Route path="/feed/:id" exact>
          <Modal description="" closeModal={handleCloseOrderInfoModal}>
            <OrderInfo />
          </Modal>
        </Route>
      )}
    </>
    {orderNumberModal && (
      <Modal description="" closeModal={handleCloseModalOrder}>
        <OrderDetails />
      </Modal>
    )}
  </div>
);
  
}
export default App;