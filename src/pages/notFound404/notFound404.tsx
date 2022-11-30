import {FC} from 'react';
import { Link } from "react-router-dom";
import errorImg from "../..//images/404.jpg";
import style from "./notFound404.module.css";
import { useTypedDispatch } from "../../services/types";
const NotFound404:FC= ()=> {
  return (
    <div className={`${style.container} pb-20`}>
      <img
        className={style.img}
        src={errorImg}
        alt={errorImg}
      />
      <Link
        to="/"
        className={`${style.link} pt-15 text text_type_main-medium text_color_inactive`}
      >
        Перейти на главную страницу
      </Link>
    </div>
  );
};
export default NotFound404