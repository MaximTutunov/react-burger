import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Switch } from "react-router-dom";
import { singOut, updateUser } from "../../services/actions/authAction";
import { Orders } from "./orders-history/orders-history";
import style from "./profile.module.css";

export function Profile() {
  const dispatch = useDispatch();
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
      <Switch>
        <Route path="/profile/orders" exact>
          <Orders />
        </Route>
        <Route path="/profile" exact>
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
