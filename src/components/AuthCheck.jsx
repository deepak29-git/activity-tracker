import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

function AuthCheck({ children }) {
  const location = useLocation();
  const token = Cookies.get("token");
  console.log({ token, location });

  if (!token && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  if (token && location.pathname === "/login") {
    return <Navigate to="/todos" replace />;
  }

  // Render the children if the user is authenticated or accessing the login page
  return children;
}

export default AuthCheck;
