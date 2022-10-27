import React from "react";
import {useLocation, Link, NavLink,} from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./app-header.module.css";

export default function AppHeader() {
  const location = useLocation();

  return (
    <header className={style.header}>
      <nav className={`${style.menu}`}>
        <div className={style.menu_container}>

          <div
            className={`${style.menu_item} mt-4 mb-4 pl-5 pt-4 pb-4 pr-5 mr-2`}
          >
            <NavLink
              to="/"
              exact
              className={style.menu_link}
              activeClassName={`${style.menu_link_active} text text_type_main-default`}
            >
              <BurgerIcon
                type={location.pathname === "/" ? "primary" : "secondary"}
              />
              <p className="text text_type_main-default pl-2">Конструктор</p>
            </NavLink>
          </div>

          <div
            className={`${style.menu_item} mt-4 mb-4 pl-5 pt-4 pb-4 pr-3`}
          >
            <NavLink
              to="/feed"
              exact
              className={style.menu_link}
              activeClassName={`${style.menu_link_active} text text_type_main-default`}
            >
              <ListIcon
                type={location.pathname === "/feed" ? "primary" : "secondary"}
              />
              <p className="text text_type_main-default pl-2">
                Лента заказов
              </p>
            </NavLink>
          </div>

          <div className={`${style.menu_item} ml-25`}>
            <Link to="/">
              <Logo type="primary" />
            </Link>
          </div>
          
        </div>

        <div
          className={`${style.menu_item} mt-4 mb-4 pl-5 pt-4 pb-4 pr-5`}
        >
          <NavLink
            to="/profile"
            className={style.menu_link}
            activeClassName={`${style.menu_link_active} text text_type_main-default`}
          >
            <ProfileIcon
              type={
                location.pathname === "/profile" ||
                location.pathname === "/profile/orders" ||
                location.pathname === "/login"
                  ? "primary"
                  : "secondary"
              }
            />
            <p className="text text_type_main-default pl-2">
              Личный кабинет
            </p>
          </NavLink>
        </div>

      </nav>
    </header>
  );
}


