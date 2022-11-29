import { useSelector, useDispatch } from "react-redux";
  import { Link, Redirect, useLocation } from "react-router-dom";
import {
    Button,
    Input,
    PasswordInput,
  } from "@ya.praktikum/react-developer-burger-ui-components";
    import {
    resetPassword,
    setResetFormValue,
  } from "../../services/actions/authAction";
  import { getCookie } from "../../utils/cookie";
  import style from "./resetPassword.module.css";
  
  export function ResetPassword () {
    const dispatch = useDispatch();
    const location = useLocation();
    const cookie = getCookie("token");
  
    const { password, code } = useSelector((state) => state.authorization.form);
    const { resetPassSuccess, forgotPassSuccess } = useSelector(
      (state) => state.authorization
    );
      function onChange(evt) {
      dispatch(setResetFormValue(evt.target.name, evt.target.value));
    }
      function formSubmit(evt) {
      evt.preventDefault();
      dispatch(resetPassword({ password, token: code }));
    }
   
    if (cookie) {
      return <Redirect to={location.state?.from || "/"} />;
    }
    if (!forgotPassSuccess) {
      return <Redirect to={{ pathname: "/forgot-password" }} />;
    }
  
    return (
      <div className={style.container}>
        <h2 className="pb-6 text_type_main-medium text">Восстановление пароля</h2>
  
        <form className={style.form} onSubmit={formSubmit}>
          <div className="pb-6">
            <PasswordInput
              onChange={onChange}
              placeholder={"Введите новый пароль"}
              value={password}
              name={"password"}
              size="default"
            />
          </div>
          <div className="pb-6">
            <Input
              onChange={onChange}
              type={"text"}
              placeholder={"Введите код из письма"}
              value={code}
              name={"code"}
              error={false}
              errorText={"Ошибка"}
              size={"default"}
            />
          </div>
          <div className={style.button}>
            <Button disabled={!password || !code} type="primary" size="medium">
              {!!resetPassSuccess ? (
                <Redirect to={location.state?.from || "/profile"} />
              ) : (
                ""
              )}
              Сохранить
            </Button>
          </div>
        </form>
          <p className="pt-20 text_type_main-default text_color_inactive text">
          Вспомнили пароль?
          <Link className={style.link} to="/login">
            Войти
          </Link>
        </p>
      </div>
    );
  };
  