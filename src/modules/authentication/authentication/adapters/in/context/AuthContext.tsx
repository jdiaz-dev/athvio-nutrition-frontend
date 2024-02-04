import { createContext } from 'react';
import { CredentialsSignIn } from '../../out/authentication.types';

export type AuthContextData = {
  isAuthenticated: boolean;
  professional: string; //TODO: change name
  signIn: (credentials: CredentialsSignIn) => Promise<any>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);
