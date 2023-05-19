import { CustomRecipeInitialState } from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';
import { ProgramInitialState } from 'src/modules/professionals/programs/adapters/out/program.types';
import { UserSignUpModel } from 'src/modules/security/users/adapters/out/user.types';

export type DateItem<T> = {
  title: string;
  date: Date;
  extendedProps: T;
};

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

export type ClientGroup = {
  _id: string;
  groupName: string;
};

export type ReduxStates = {
  users: UserSignUpModel;
  customRecipes: CustomRecipeInitialState;
  programs: ProgramInitialState;
};
