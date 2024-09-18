import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from 'src/store/store';
import Status from 'src/Utilities/Enums';

interface ComponentForPrivateRoute {
  component: React.ComponentType;
  route: string;
}

const PrivateComponent = ({
  component: Component,
  route,
}: ComponentForPrivateRoute) => {
  const authStatus = useAppSelector((state) => state.auth.status);

  return (
    <>
      {authStatus === Status.Success ? <Component /> : <Navigate to={route} />}
    </>
  );
};

export default PrivateComponent;
