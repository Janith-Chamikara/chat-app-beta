import React, { useContext } from "react";
import { AuthContext } from "./AuthContextProvider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const currentUser = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
