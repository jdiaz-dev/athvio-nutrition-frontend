import { ParametersStatus } from 'src/modules/nutrition-builder/helpers/enums';
import { Meal, MealBasicInfo, MealDetails } from 'src/shared/components/PlanDetailDialog/Meal.types';
import { MealWithStatus } from 'src/shared/components/PlanDetailDialog/MealList';
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

export type NutritionBuilderInitialState = {
  diseaseCauses: (DiseaseCauseBody & { status: ParametersStatus })[];
  diseases: (DiseaseBody & { status: ParametersStatus })[];
  nutritionalPreferences: (NutritionalPreferenceBody & { status: ParametersStatus })[];
};
