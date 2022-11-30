import { Redirect, Route, useLocation, RouteProps } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import {FC, ReactNode} from 'react';
import {TLocation} from '../../services/types';
const ProtectedRoute:FC<RouteProps&{childre?:ReactNode}>=({ children, ...rest })=> {
  const location = useLocation<TLocation>();
  const cookie = getCookie("token");

  return (
    <Route
      {...rest}
      render={() =>
        cookie ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
export default ProtectedRoute