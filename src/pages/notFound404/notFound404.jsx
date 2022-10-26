import { Link } from "react-router-dom";
import styleNotFound from "./notFound404.module.css";
import errorImg from "../..//images/404.jpg";


export const NotFound404 = () => {
  return (
    <div className={`${styleNotFound.container} pb-20`}>
      <img
        className={styleNotFound.img}
        src={errorImg}
        alt={errorImg}
      />
      <Link
        to="/"
        className={`${styleNotFound.link} pt-15 text text_type_main-medium text_color_inactive`}
      >
        Перейти на главную страницу
      </Link>
    </div>
  );
};
