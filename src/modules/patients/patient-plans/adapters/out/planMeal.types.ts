import { PatientPlanBody } from 'src/modules/patients/patient-plans/adapters/out/patientPlan.types';
import { Meal, MealBasicInfo, MealDetails } from 'src/shared/components/PlanDetailDialog/Meal.types';
import { GetRecordsBody, MetadataRecords } from 'src/shared/types/get-records.types';

export interface Plan {
  _id: string;
  title?: string;
  week: number;
  day: number;
  meals: Meal[];
}

export interface PlanMealBody {
  professional: string;
  patient: string;
  patientPlan: string;
  mealBody: Omit<Meal, '_id'>;
}

export type CreatePatientPlanMealInput = PlanMealBody;

export interface AddPatientPlanRequest {
  input: CreatePatientPlanMealInput;
}

export interface AddPatientPlanResponse {
  addPlanMeal: PatientPlanBody;
}

export interface GetPatientPlansRequest {
  input: GetRecordsBody;
}

export interface PatientPlans {
  data: PatientPlanBody[];
  meta: MetadataRecords;
}
/* export interface GetPatientPlansResponse {
  getPatientPlans: PatientPlans;
} */

export interface UpdatePatientPlanMealInput extends CreatePatientPlanMealInput {
  meal: string;
}

export interface UpdatePlanMealRequest {
  input: UpdatePatientPlanMealInput;
}

export interface UpdatePlanMealResponse {
  updatePlanMeal: PatientPlanBody;
}

export interface DeletePlanMealInput {
  professional: string;
  patient: string;
  patientPlan: string;
  meal: string;
}

export interface DeletePlanMealRequest {
  input: DeletePlanMealInput;
}

export interface DeletePlanMealResponse {
  deletePlanMeal: PatientPlanBody;
}
/* 
export interface PlanDayInfo {
  _id: string | null;
  totalMeals: number | null;
}
export type ProgramPlanDateExtendedProps = {
  plan: PlanDayInfo;
  program: string;
  planDay: number;
  planWeek: number;
}; */

export interface PatientPlanInitialState {
  patientPlans: PatientPlans | null;
  patientPlan: PatientPlanBody;
  mealBasicInfo: MealBasicInfo;
  mealDetails: MealDetails;
}
