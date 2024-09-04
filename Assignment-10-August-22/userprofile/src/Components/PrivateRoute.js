import React from "react";
import { Navigate } from "react-router-dom";
import { authStatus } from "../store/authSlice";

const PrivateRoute = (props) =>
  authStatus() ? <props.toBeAuthenticated /> : <Navigate to="/login" />;

export default PrivateRoute;
