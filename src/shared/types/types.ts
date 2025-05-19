import { SignUpProfessionalModel } from 'src/modules/authentication/authentication/adapters/out/authentication.types';
import { ChatInitialState } from 'src/modules/patients/patient-console/chat/adapters/out/chat';
import { PatientInitialState } from 'src/modules/patients/patient-console/patient/adapters/out/patient';
import { PatientPlanInitialState } from 'src/modules/patients/patient-console/patient-plans/adapters/out/patientPlan.types';
import { AssignProgramInitialState } from 'src/modules/professionals/assign-program/out/AssignProgram.types';
import { NutritionalMealInitialState } from 'src/modules/professionals/nutritional-meals/adapters/out/nutritionalMeal';
import { ProfessionalInitialState } from 'src/modules/professionals/professional/adapters/out/professional';
import { ProgramInitialState } from 'src/modules/professionals/programs/adapters/out/program.types';
import { QuestionaryConfigInitialState } from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfig';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';
import { NutritionBuilderInitialState } from 'src/modules/nutrition-builder/adapters/out/nutritionBuilder';
import { NotesInitialState } from 'src/modules/patients/patient-console/notes/helpers/notes';

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

export type PatientGroup = {
  _id: string;
  groupName: string;
};
export type GraphQLInput = {
  professional: string;
  offset: number;
  limit: number;
  search?: string[];
};

export type ReduxStates = {
  users: SignUpProfessionalModel;
  nutritionalMeals: NutritionalMealInitialState;
  programs: ProgramInitialState;
  patientPlans: PatientPlanInitialState;
  assignProgram: AssignProgramInitialState;
  chat: ChatInitialState;
  patient: PatientInitialState;
  professional: ProfessionalInitialState;
  questionaryConfig: QuestionaryConfigInitialState;
  nutritionBuilder: NutritionBuilderInitialState;
  notes: NotesInitialState;
};

export interface PlanDayInfo {
  _id: string | null;
  meals: Meal[] | null;
}
