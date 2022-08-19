import React from "react";
import {
  Logo,
  BurgerIcon,
  ProfileIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./appHeader.module.css";

const AppHeader =() => {
    return(
        <header className={styles.header}>
            <nav>
                <ul className={styles.list}>
                    <li className={styles.list__item}>
                        <BurgerIcon type="primary" />
                        <a className="text text_type_main-default">Конструктор</a>
                    </li>
                    <li>
                        <a className="text text_type_main-default text_color_inactive">Лента заказов</a>
                    </li>
                </ul>
            </nav>
            <Logo></Logo>
            <div className={styles.profile}>
                <ProfileIcon type="secondary"/>
                <a className ='text text_type_main-default text_color_inactive'>Личный кабинет</a>
            </div>
        </header>
    )
};

export default AppHeader;