import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { setLoginFormValue, singIn } from "../../services/actions/authAction";
import { getCookie } from "../../utils/cookie";
import style from "./login.module.css";

export function Login () {
  const location = useLocation();
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.authorization.form);
  const cookie = getCookie("token");


  function onSubmit(evt) {
    evt.preventDefault();
    dispatch(singIn(email, password));
  }

  function onChange(evt) {
    dispatch(setLoginFormValue(evt.target.name, evt.target.value));
  }

  if (cookie) {
    return <Redirect to={location.state?.from || "/"} />;
  }

  return (
    <div className={style.container}>
      <h2 className={`${style.title} pb-6 text_type_main-medium text`}>Вход</h2>
      <form className={style.form} onSubmit={onSubmit}>
        <div className="pb-5">
          <EmailInput
            onChange={onChange}
            value={email}
            name={"email"}
            size="default"
          />
        </div>
        <div className="pb-5">
          <PasswordInput
            onChange={onChange}
            value={password}
            name={"password"}
            size="default"
          />
        </div>
        <Button disabled={!password || !email} type="primary" size="medium">
          Войти
        </Button>
      </form>
      <p className="pt-20 pb-4 text_type_main-default text_color_inactive text">
        Вы — новый пользователь?
        <Link className={style.link} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text_type_main-default text_color_inactive text">
        Забыли пароль?
        <Link className={style.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};