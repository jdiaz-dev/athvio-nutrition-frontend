import { UserSignUpModel } from 'src/modules/security/users/adapters/out/user.types';

export interface CountryList {
  name: { common: string };
  idd: { root: string; suffixes: string[] };
  flags: { png: string; svg: string };
}

export type ReduxStates = {
  users: UserSignUpModel;
};
