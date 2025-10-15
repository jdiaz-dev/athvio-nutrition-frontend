import React, { ReactNode, useState } from 'react';
import { createSessionCookies, getToken, getProfessionalId, cleanSessionCookies } from 'src/modules/auth/auth/adapters/out/cookies';
import { AuthContext } from '../context/AuthContext';
import { useAuthentication } from '../../out/authenticationActions';
import {
  CredentialsSignIn,
  JwtDto,
  SignInProfessionalWithGoogleInput,
  SignUpProfessionalModel,
  SignUpProfessionalResponse,
  SignUpProfessionalWithGoogleInput,
  SignUpProfessionalWithGoogleResponse,
} from '../../out/authentication.types';
import { FetchResult } from 'apollo-boost';

function AuthProvider({ children }: { children: ReactNode }) {
  const { signIn, signUpProfessional, signUpProfessionalWithGoogle, signInProfessionalWithGoogle } = useAuthentication();

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
  const signUpProfessionalHandler = async (body: SignUpProfessionalModel): Promise<FetchResult<SignUpProfessionalResponse>> => {
    return await signUpProfessional(body);
  };
  const signInWithGoogleHandler = async (body: SignInProfessionalWithGoogleInput) => {
    const { data } = await signInProfessionalWithGoogle(body);
    if (data) saveJwt(data.signInWithGoogle);
  };
  const signUpWithGoogleHandler = async (
    body: SignUpProfessionalWithGoogleInput,
  ): Promise<FetchResult<SignUpProfessionalWithGoogleResponse>> => {
    return await signUpProfessionalWithGoogle(body);
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
        signInWithGoogleHandler,
        signUpWithGoogleHandler,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
