import React, { ReactNode, useState } from 'react';
import { createSessionCookies, getToken, getUserId } from 'src/modules/authentication/authentication/adapters/out/cookies';
import { AuthContext } from '../context/AuthContext';
import { useAuthentication } from '../../out/authenticationActions';
import { CredentialsSignIn, JwtDto, SignUpProfessionalModel } from '../../out/authentication.types';

function AuthProvider({ children }: { children: ReactNode }) {
  const { signIn, signUpProfessional } = useAuthentication();

  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getToken()));
  const professional = getUserId();

  const saveJwt = (data: JwtDto) => {
    createSessionCookies({ ...data });
    setIsAuthenticated(true);
  };
  const signInHandler = async (credentials: CredentialsSignIn) => {
    const { data } = await signIn(credentials);
    if (data) saveJwt(data.signIn);
  };
  const signUpProfessionalHandler = async (body: SignUpProfessionalModel) => {
    const { data } = await signUpProfessional(body);
    if (data) saveJwt(data.signUpProfessional);
  };
  
  const signOut = () => {};
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        professional,
        signInHandler,
        signUpProfessionalHandler,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
