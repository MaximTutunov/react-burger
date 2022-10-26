import React from "react";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation, Link, NavLink,} from 'react-router-dom';

function AppHeader() {

  const location = useLocation();

  return (
    <header className={headerStyles.header}>
      <nav className={`${headerStyles.menu}`}>
        <div className={headerStyles.menu_container}>

          <div
            className={`${headerStyles.menu_item} mt-4 mb-4 pl-5 pt-4 pb-4 pr-5 mr-2`}
          >
            <NavLink
              to="/"
              exact
              className={headerStyles.menu_link}
              activeClassName={`${headerStyles.menu_link_active} text text_type_main-default`}
            >
              <BurgerIcon
                type={location.pathname === "/" ? "primary" : "secondary"}
              />
              <p className="text text_type_main-default pl-2">Конструктор</p>
            </NavLink>
          </div>

          <div
            className={`${headerStyles.menu_item} mt-4 mb-4 pl-5 pt-4 pb-4 pr-3`}
          >
            <NavLink
              to="/feed"
              exact
              className={headerStyles.menu_link}
              activeClassName={`${headerStyles.menu_link_active} text text_type_main-default`}
            >
              <ListIcon
                type={location.pathname === "/feed" ? "primary" : "secondary"}
              />
              <p className="text text_type_main-default pl-2">
                Лента заказов
              </p>
            </NavLink>
          </div>

          <div className={`${headerStyles.menu_item} ml-25`}>
            <Link to="/">
              <Logo type="primary" />
            </Link>
          </div>
          
        </div>

        <div
          className={`${headerStyles.menu_item} mt-4 mb-4 pl-5 pt-4 pb-4 pr-5`}
        >
          <NavLink
            to="/profile"
            className={headerStyles.menu_link}
            activeClassName={`${headerStyles.menu_link_active} text text_type_main-default`}
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

export default AppHeader;
