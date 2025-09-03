import React, { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';

function PrivateRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  return <>{children}</>;
}

export default PrivateRoute;
