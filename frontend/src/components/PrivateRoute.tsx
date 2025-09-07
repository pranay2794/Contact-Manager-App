import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const userLogin = useSelector((state: RootState) => state.userLogin);
  const userInfo = userLogin && userLogin.userInfo;
  const path = window.location.pathname;


  console.log("PrivateRoute - userInfo:", userInfo);

  // If user is logged in and tries to access login or register, redirect to dashboard
  if ((path === "/login") && userInfo) {
    return <Navigate to="/dashboard" replace />;
  }
  if ((path === "/register") && userInfo) {
    return <Navigate to="/dashboard" replace />;
  }

  // If user is not logged in and tries to access dashboard or register, redirect to login
  if ((path === "/dashboard" || path === "/register") && !userInfo) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
