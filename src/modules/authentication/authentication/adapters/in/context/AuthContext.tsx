import { createContext } from 'react';
import { CredentialsSignIn, SignUpProfessionalModel } from '../../out/authentication.types';

export type AuthContextData = {
  isAuthenticated: boolean;
  professional: string; //TODO: change name
  signInHandler: (credentials: CredentialsSignIn) => Promise<any>;
  signUpProfessionalHandler: (credentials: SignUpProfessionalModel) => Promise<any>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);
