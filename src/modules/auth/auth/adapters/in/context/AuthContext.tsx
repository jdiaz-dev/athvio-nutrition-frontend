import { createContext } from 'react';
import {
  CredentialsSignIn,
  SignInProfessionalWithGoogleInput,
  SignInProfessionalWithGoogleResponse,
  SignUpProfessionalModel,
  SignUpProfessionalResponse,
  SignUpProfessionalWithGoogleInput,
  SignUpProfessionalWithGoogleResponse,
} from '../../out/authentication.types';
import { FetchResult } from 'apollo-boost';

export type AuthContextData = {
  isAuthenticated: boolean;
  professional: string; //TODO: change name
  signInHandler: (credentials: CredentialsSignIn) => Promise<any>;
  signUpProfessionalHandler: (credentials: SignUpProfessionalModel) => Promise<FetchResult<SignUpProfessionalResponse>>;
  signInWithGoogleHandler: (credentials: SignInProfessionalWithGoogleInput) => Promise<FetchResult<SignInProfessionalWithGoogleResponse>>;
  signUpWithGoogleHandler: (credentials: SignUpProfessionalWithGoogleInput) => Promise<FetchResult<SignUpProfessionalWithGoogleResponse>>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);
