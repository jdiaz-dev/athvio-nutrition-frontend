import { PatientPlanBody } from 'src/modules/patients/patient-console/patient-plans/adapters/out/patientPlan.types';
import { Meal, MealBasicInfo, MealDetails } from 'src/shared/components/PlanDetailDialog/Meal.types';
import { GetRecordsBody, MetadataRecords } from 'src/shared/types/get-records.types';

export type PlanMealBody = {
  professional: string;
  patient: string;
  patientPlan: string;
  meals: Meal[];
};

type CreatePatientPlanMealInput = Omit<PlanMealBody, 'meals'> & {
  meals: Omit<Meal, 'uuid'>[];
};

export interface GetPatientPlansRequest {
  input: GetRecordsBody;
}

export interface PatientPlans {
  data: PatientPlanBody[];
  meta: MetadataRecords;
}

export type UpdatePatientPlanMealInput = CreatePatientPlanMealInput;

export type DeletePlanMealInput = Omit<PlanMealBody, 'meals'> & {
  meals: string[];
};

export interface PatientPlanMealsCrudRequest {
  toAddInput: CreatePatientPlanMealInput;
  toUpdateInput: UpdatePatientPlanMealInput;
  toDeleteInput: DeletePlanMealInput;
  shouldToAdd: boolean;
  shouldToUpdate: boolean;
  shouldToDelete: boolean;
}

export interface PatientPlanMealsCrudResponse {
  addPlanMeal: PatientPlanBody;
  updatePlanMeal: PatientPlanBody;
  deletePlanMeal: PatientPlanBody;
}

export interface PatientPlanInitialState {
  patientPlans: PatientPlans | null;
  patientPlan: PatientPlanBody;
  mealBasicInfo: MealBasicInfo;
  mealDetails: MealDetails;
}
