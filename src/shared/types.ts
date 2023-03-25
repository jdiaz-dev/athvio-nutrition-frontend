import { CustomMeal } from 'src/modules/professionals/custom-meals/adapters/out/customMeal.types';
import { UserSignUpModel } from 'src/modules/security/users/adapters/out/user.types';

export type DataUser = {
  _id: string;
  userType: string;
  token: string;
};

export interface CountryList {
  name: { common: string };
  idd: { root: string; suffixes: string[] };
  flags: { png: string; svg: string };
}

export type ReduxStates = {
  users: UserSignUpModel;
  customMeal: CustomMeal;
};

export type ClientGroup = {
  _id: string;
  groupName: string;
};
