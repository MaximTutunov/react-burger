import {
    Button,
    EmailInput,
    Input,
    PasswordInput,
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import { useSelector, useDispatch } from "react-redux";
  import { Link, Redirect, useLocation } from "react-router-dom";
  import {
    registerUser,
    setRegisterFormValue,
  } from "../../services/actions/authorization";
  import { getCookie } from "../../utils/cookie";
  import registrationStyle from "./registration.module.css";
  
  export const Register = () => {
    const dispatch = useDispatch();
  
    const { email, password, name } = useSelector(
      (state) => state.authorization.form
    );
    const location = useLocation();
  
    const cookie = getCookie("token");
  
    function formSubmit(evt) {
      evt.preventDefault();
      dispatch(registerUser(email, password, name));
    }
  
    function onChange(evt) {
      dispatch(setRegisterFormValue(evt.target.name, evt.target.value));
    }
  
    if (cookie) {
      return <Redirect to={location.state?.from || "/"} />;
    }
  
    return (
      <div className={registrationStyle.container}>
        <h2
          className={`${registrationStyle.title} pb-6 text_type_main-medium text`}
        >
          Регистрация
        </h2>
        <form className={registrationStyle.form} onSubmit={formSubmit}>
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
          <Link className={registrationStyle.link} to="/login">
            Войти
          </Link>
        </p>
      </div>
    );
  };
  