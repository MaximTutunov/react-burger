import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  wsAuthConnectionClosed,
  wsAuthConnectionOpen,
} from "../../services/actions/wsAuthAction";
import { useDispatch, useSelector } from "react-redux";
import { OrdersHistory } from "./orders-history/orders-history";
import {
  NavLink,
  Route,
  useLocation,
  useRouteMatch,
  Switch,
} from "react-router-dom";
import {
  singOut,
  updateUser,
  getUser,
} from "../../services/actions/authAction";
import { Orders } from "./orders-history/orders-history";
import { OrderInfo } from "../../components/order-info/order-info";
import style from "./profile.module.css";

export function Profile() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const matchOrderDetails = !!useRouteMatch({ path: "/profile/orders/:id" });
  const { email, name } = useSelector((state) => state.authorization.user);
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  function onSingOut() {
    dispatch(singOut());
  }

  function onChange(evt) {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  }

  function submit(evt) {
    evt.preventDefault();
    dispatch(updateUser(form.email, form.name, form.password));
  }
  useEffect(() => {
    dispatch(getUser());
    dispatch(wsAuthConnectionOpen());
    return () => {
      dispatch(wsAuthConnectionClosed());
    };
  }, [dispatch]);

  useEffect(() => {
    setForm({
      email: email,
      name: name,
      password: "",
    });
  }, [email, name]);

  function reset(evt) {
    evt.preventDefault();
    setForm({
      email: email,
      name: name,
      password: "",
    });
  }

  return (
    <div className={`${style.container} pt-30`}>
      {!matchOrderDetails && (
        <nav className={`${style.nav} pr-15`}>
          <ul className={`${style.items}`}>
            <li className={`${style.item}`}>
              <NavLink
                to="/profile"
                exact
                className={`${style.link} text_type_main-medium text_color_inactive text`}
                activeClassName={`${style.linkActive} text_type_main-medium text`}
              >
                Профиль
              </NavLink>
            </li>
            <li className={`${style.item}`}>
              <NavLink
                to="/profile/orders"
                exact
                className={`${style.link} text_type_main-medium text_color_inactive text`}
                activeClassName={`${style.linkActive} text_type_main-medium text`}
              >
                История заказов
              </NavLink>
            </li>
            <li className={`${style.item}`}>
              <NavLink
                to="/login"
                exact
                className={`${style.link} text_type_main-medium text_color_inactive text`}
                activeClassName={`${style.linkActive} text_type_main-medium text`}
                onClick={onSingOut}
              >
                Выход
              </NavLink>
            </li>
          </ul>
          <p
            className={`${style.description} pt-20 pb-4 text_type_main-default text_color_inactive text`}
          >
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </nav>
      )}
      <Switch location={background || location}>
        <Route path="/profile/orders" exact>
          <OrdersHistory />
        </Route>
        <Route path="/profile/orders/:id" exact>
          <OrderInfo />
        </Route>
        <Route exact path="/profile">
          <form className={style.form} onSubmit={submit}>
            <div className="pb-6">
              <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={onChange}
                icon={"EditIcon"}
                value={form.name}
                name={"name"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
              />
            </div>
            <div className="pb-6">
              <Input
                type={"email"}
                placeholder={"Логин"}
                onChange={onChange}
                icon={"EditIcon"}
                value={form.email}
                name={"email"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
              />
            </div>
            <div className="pb-6">
              <Input
                type={"password"}
                placeholder={"Пароль"}
                onChange={onChange}
                icon={"EditIcon"}
                value={form.password}
                name={"password"}
                error={false}
                errorText={"Ошибка"}
                size={"default"}
              />
            </div>
            <div className={style.buttons}>
              <Button type="primary" size="medium" onClick={reset}>
                Oтмена
              </Button>
              <Button
                disabled={!form.email && !form.password && !form.name}
                type="primary"
                size="medium"
              >
                Сохранить
              </Button>
            </div>
          </form>
        </Route>
      </Switch>
    </div>
  );
}
