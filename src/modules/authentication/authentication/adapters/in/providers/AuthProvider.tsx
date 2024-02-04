import { useMutation } from '@apollo/client';
import { ApolloError } from 'apollo-boost';
import React, { ReactNode } from 'react';
import {
  CredentialsSignIn,
  SignInRequest,
  SignInResponse,
} from 'src/modules/authentication/authentication/adapters/out/authentication.types';
import { SIGN_IN } from 'src/modules/authentication/authentication/adapters/out/authenticationQueries';
import { createSessionCookies, getToken, getUserId } from 'src/modules/authentication/authentication/adapters/out/cookies';
import { AuthContext } from '../context/AuthContext';

function AuthProvider({ children }: { children: ReactNode }) {
  const [signInHandler] = useMutation<SignInResponse, SignInRequest>(SIGN_IN);

  const isAuthenticated = Boolean(getToken());
  const professional = getUserId();
  const signIn = async (credentials: CredentialsSignIn): Promise<any> => {
    try {
      const { data } = await signInHandler({
        variables: {
          input: {
            ...credentials,
          },
        },
      });

      if (data) {
        console.log('--------data', data.signIn.token);
        createSessionCookies({ ...data.signIn });
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      return error;
    }
  };
  const signOut = () => {};
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        professional,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
