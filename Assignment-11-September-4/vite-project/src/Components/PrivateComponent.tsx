import React from "react";
import { useAppSelector } from "../store/store";
import { Navigate } from "react-router-dom";
import Status from "src/Utilities/Enums";

interface ComponentForPrivateRoute {
  component: React.ComponentType; // Expecting a component type
  route: string;
}

const PrivateComponent = ({
  component: Component,
  route,
}: ComponentForPrivateRoute) => {
  const authStatus = useAppSelector((state) => state.auth.status);

  return (
    <>
      {authStatus === Status.Success ? (
        <Component /> 
      ) : (
        <Navigate to={route} />
      )}
    </>
  );
};

export default PrivateComponent;