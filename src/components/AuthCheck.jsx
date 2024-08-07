import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
function AuthCheck({ children }) {
//   const isAuth = useSelector((state) => state.auth.token);
  const getToken = Cookies.get("token");
  if (!getToken) {
    return <Navigate to="/login"/>;
  }
  return children;
}
export default AuthCheck;
