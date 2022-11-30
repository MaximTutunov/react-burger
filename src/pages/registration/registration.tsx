import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  registerUser,
  setRegisterFormValue,
} from "../../services/actions/authAction";
import { getCookie } from "../../utils/cookie";
import style from "./registration.module.css";
import { useTypedDispatch, useTypedSelector, TLocation } from "../../services/types";
import React, { FC, useState, useEffect, ChangeEvent, FormEvent } from "react";


const Register:FC= ()=> {
  const dispatch = useTypedDispatch();
  const location = useLocation<TLocation>();
  const { email, password, name } = useTypedSelector(
    (state) => state.authorization.form
  );
  const cookie = getCookie("token");

  function formSubmit(evt:FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    dispatch(registerUser(email, password, name));
  }

  function onChange(evt:ChangeEvent<HTMLInputElement>) {
    dispatch(setRegisterFormValue(evt.target.name, evt.target.value));
  }

  if (cookie) {
    return <Redirect to={location.state?.from || "/"} />;
  }

  return (
    <div className={style.container}>
      <h2
        className={`${style.title} pb-6 text_type_main-medium text`}
      >
        Регистрация
      </h2>
      <form className={style.form} onSubmit={formSubmit}>
        <div className="pb-6">
          <Input
            onChange={onChange}
            type={"text"}
            placeholder={"Имя"}
            value={name}
            name={"name"}
            error={false}
            size={"default"}
          />
        </div>
        <div className="pb-6">
          <EmailInput
            onChange={onChange}
            value={email}
            name={"email"}
            size="default"
          />
        </div>
        <div className="pb-6">
          <PasswordInput
            onChange={onChange}
            value={password}
            name={"password"}
            size="default"
          />
        </div>
        <Button
          disabled={!(name && email && password)}
          type="primary"
          size="medium"
        >
          Зарегистрироваться
        </Button>
      </form>
      <p className="pt-20 text_type_main-default text_color_inactive text">
        Уже зарегистрированы?
        <Link className={style.link} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
};
export default Register