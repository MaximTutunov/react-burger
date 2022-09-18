import React from "react";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav>
          <ul className={styles.list}>
            <li className={`${styles.list_item} pl-5 pr-5 pb-5 pt-5 mr-2`}>
              <BurgerIcon type="primary" />
              <span className="text text_type_main-default text_color_inactive pl-2">
                Конструктор
              </span>
            </li>
            <li className={`${styles.list_item} pl-5 pr-5 pb-5 pt-5`}>
              <ListIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive pl-2">
                Лента&nbsp;заказов
              </span>
            </li>
          </ul>
        </nav>
        <a href="/" className={styles.logo}>
          <Logo />
        </a>
        <a href="/" className={styles.profile}>
          <ProfileIcon type="secondary" />
          <span className="text text_type_main-default text_color_inactive pl-2">
            Личный&nbsp;кабинет
          </span>
        </a>
      </div>
    </header>
  );
}

export default AppHeader;
