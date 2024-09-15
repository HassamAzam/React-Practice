import React from "react";
import { useAppSelector } from "../store/store";
import { Navigate } from "react-router-dom";
import Status from "src/Utilities/Enums";

interface ComponentForPrivateRoute {
  toBeAuthenticated: React.FC;
}
const PrivateComponent = (props: ComponentForPrivateRoute) => {
  const authStatus = useAppSelector((state) => state.auth.status);
  return (
    <>
      {authStatus == Status.Success ? (
        <props.toBeAuthenticated />
      ) : (
        <Navigate to="/login" />
      )}
      ;
    </>
  );
};
export default PrivateComponent;
