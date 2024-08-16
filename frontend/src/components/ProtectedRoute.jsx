import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute() {
  const isAuth = !!localStorage.getItem("token");

  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoute;
