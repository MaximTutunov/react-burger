import { Redirect, Route, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

export function ProtectedRoute({ children, ...rest }) {
  const location = useLocation();
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
