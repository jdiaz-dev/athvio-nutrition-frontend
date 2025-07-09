import { SignUpProfessionalModel } from 'src/modules/authentication/authentication/adapters/out/authentication.types';
import { ChatInitialState } from 'src/modules/patients/patient-console/chat/adapters/out/chat';
import { PatientPlanInitialState } from 'src/modules/patients/patient-console/patient-plans/adapters/out/patientPlan.types';
import { AssignProgramInitialState } from 'src/modules/professionals/assign-program/out/AssignProgram.types';
import { NutritionalMealInitialState } from 'src/modules/professionals/nutritional-meals/adapters/out/nutritionalMeal';
import { ProfessionalInitialState } from 'src/modules/professionals/professional/adapters/out/professional';
import { ProgramInitialState } from 'src/modules/professionals/programs/adapters/out/program.types';
import { ProfessionalQuestionaryInitialState } from 'src/modules/questionaries/professional-questionaries/adapters/out/ProfessionalQuestionary';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';
import { NutritionBuilderInitialState } from 'src/modules/nutrition-builder/adapters/out/nutritionBuilder';
import { NotesInitialState } from 'src/modules/patients/patient-console/notes/helpers/notes';
import { PatientQuestionaryInitialState } from 'src/modules/questionaries/patient-questionaries/adapters/out/PatientQuestionary';
import { PatientInitialState } from 'src/modules/patients/patient-console/profile/out/PatientProfile';

export type DateItem<T> = {
  title: string;
  date: Date;
  extendedProps: T;
};

export type DataUser = {
  uuid: string;
  userType: string;
  token: string;
};

export interface CountryList {
  name: { common: string };
  idd: { root: string; suffixes: string[] };
  flags: { png: string; svg: string };
}

export type PatientGroup = {
  uuid: string;
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
  professionalQuestionary: ProfessionalQuestionaryInitialState;
  patientQuestionary: PatientQuestionaryInitialState;
  nutritionBuilder: NutritionBuilderInitialState;
  notes: NotesInitialState;
};

export interface PlanDayInfo {
  uuid: string | null;
  meals: Meal[] | null;
}
