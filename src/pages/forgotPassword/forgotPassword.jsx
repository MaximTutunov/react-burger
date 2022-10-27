import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { forgotPassword } from "../../services/actions/authAction";
import { getCookie } from "../../utils/cookie";
import style from "./forgotPassword.module.css";

export  function ForgotPassword () {
  const dispatch = useDispatch();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const cookie = getCookie("token");
  const { forgotPassSuccess } = useSelector((state) => state.authorization);

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    dispatch(forgotPassword({ email }));
  }

  if (cookie) {
    return <Redirect to={location.state?.from || "/"} />;
  }

  return (
    <div className={style.container}>
      <h2
        className={`${style.title} pb-5 text_type_main-medium text`}
      >
        Восстановление пароля
      </h2>
      <form className={style.form} onSubmit={onSubmit}>
        <div className="pb-6">
          <Input
            onChange={onChange}
            type={"email"}
            placeholder={"Укажите e-mail"}
            value={email}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
        <Button disabled={!email} type="primary" size="medium">
          {forgotPassSuccess ? <Redirect to="/reset-password" /> : ""}
          Восстановить
        </Button>
      </form>
      <p className="mt-20 text_type_main-default text_color_inactive text">
        Вспомнили пароль?
        <Link className={style.link} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
};
