import { Meal, MealBasicInfo, MealDetails } from 'src/shared/components/PlanDetailDialog/Meal.types';
import { MealWithStatus } from 'src/shared/components/PlanDetailDialog/MealList';
import { NutriBuilderParamStatus } from 'src/shared/Consts';
import { GetRecordsBody, MetadataRecords } from 'src/shared/types/get-records.types';
import { PlanDayInfo } from 'src/shared/types/types';

export type DiseaseCauseBody = {
  _id: string;
  name: string;
};

export type DiseaseBody = {
  _id: string;
  name: string;
};

export type NutritionalPreferenceBody = {
  _id: string;
  name: string;
};

export type GetNutritionBuilderParametersResponse = {
  getDiseaseCauses: DiseaseCauseBody[];
  getDiseases: DiseaseBody[];
  getNutritionalPreferences: NutritionalPreferenceBody[];
};

export type BuildNutritionalPlanInput = {
  diseaseCauses: string[];
  nutritionalPreferences: string[];
  diseases: string[];
};

export type BuildNutritionalPlanRequest = {
  input: BuildNutritionalPlanInput;
};

export type BuildNutritionalPlanResponse = {
  buildNutritionalPlan: unknown;
};

export type NutritionBuilderInitialState = {
  diseaseCauses: (DiseaseCauseBody & { status: NutriBuilderParamStatus })[];
  diseases: (DiseaseBody & { status: NutriBuilderParamStatus })[];
  nutritionalPreferences: (NutritionalPreferenceBody & { status: NutriBuilderParamStatus })[];
};
