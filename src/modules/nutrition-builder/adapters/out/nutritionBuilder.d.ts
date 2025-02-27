import { Meal, MealBasicInfo, MealDetails } from 'src/shared/components/PlanDetailDialog/Meal.types';
import { MealWithStatus } from 'src/shared/components/PlanDetailDialog/MealList';
import { NutriBuilderParamStatus } from 'src/shared/Consts';
import { GetRecordsBody, MetadataRecords } from 'src/shared/types/get-records.types';
import { PlanDayInfo } from 'src/shared/types/types';
import { Dayjs } from 'dayjs';
import { PatientPlanBody } from 'src/modules/patients/patient-console/patient-plans/adapters/out/patientPlan.types';

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

export type GetProgramBuilderParametersResponse = {
  getAllDiseaseCauses: DiseaseCauseBody[];
  getAllDiseases: DiseaseBody[];
  getAllNutritionalPreferences: NutritionalPreferenceBody[];
};

export type BuildNutritionalPlanInput = {
  diseaseCauses: string[];
  nutritionalPreferences: string[];
  diseases: string[];
  patient: string;
  startDate: Dayjs;
};

export type BuildNutritionalPlanRequest = {
  input: BuildNutritionalPlanInput;
};

export type BuildNutritionalPlanResponse = {
  generateNutritionalPlanForPatient: PatientPlanBody[];
};

export type NutritionBuilderInitialState = {
  diseaseCauses: (DiseaseCauseBody & { status: NutriBuilderParamStatus })[];
  diseases: (DiseaseBody & { status: NutriBuilderParamStatus })[];
  nutritionalPreferences: (NutritionalPreferenceBody & { status: NutriBuilderParamStatus })[];
};
