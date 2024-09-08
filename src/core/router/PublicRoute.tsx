import React, { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';

function PublicRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return <Navigate to="/professional/patients" />;
  }
  return <>{children}</>;
}

export default PublicRoute;
