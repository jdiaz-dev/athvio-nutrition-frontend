import React, { ReactNode, useState } from 'react';
import {
  createSessionCookies,
  getToken,
  getProfessionalId,
  cleanSessionCookies,
} from 'src/modules/authentication/authentication/adapters/out/cookies';
import { AuthContext } from '../context/AuthContext';
import { useAuthentication } from '../../out/authenticationActions';
import { CredentialsSignIn, JwtDto, SignUpProfessionalModel, SignUpProfessionalWithGoogleInput } from '../../out/authentication.types';

function AuthProvider({ children }: { children: ReactNode }) {
  const { signIn, signUpProfessional, signUpProfessionalWithGoogle } = useAuthentication();

  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getToken()));
  const professional = getProfessionalId();

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
  const signUpWithGoogleHandler = async (body: SignUpProfessionalWithGoogleInput) => {
    const { data } = await signUpProfessionalWithGoogle(body);
    if (data) saveJwt(data.signUpProfessionalWithGoogle);
  };

  const signOut = () => {
    cleanSessionCookies();
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        professional,
        signInHandler,
        signUpProfessionalHandler,
        signUpWithGoogleHandler,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
