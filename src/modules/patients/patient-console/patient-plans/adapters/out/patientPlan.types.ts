import { GetPlanificationInput, PlanificationBody } from 'src/modules/patients/patient-console/planifications/helpers/planifications';
import { Meal, MealBasicInfo, MealDetails } from 'src/shared/components/PlanDetailDialog/Meal.types';
import { MealWithStatus } from 'src/shared/components/PlanDetailDialog/MealList';
import { GetRecordsBody, MetadataRecords } from 'src/shared/types/get-records.types';

export interface Plan {
  uuid: string;
  title?: string;
  week: number;
  day: number;
  meals: Meal[];
}

export interface PatientPlanBody extends Omit<Plan, 'week' | 'day'> {
  patient: string;
  assignedDate: string;
  // comments
  // commentResult
}

export interface CreatePatientPlanInput extends Pick<PatientPlanBody, 'patient' | 'assignedDate' | 'title'> {
  professional: string;
  meals: Omit<Meal, 'uuid'>[];
}

export interface CreatePatientPlanRequest {
  input: CreatePatientPlanInput;
}

export interface CreatePatientPlanResponse {
  createPatientPlan: PatientPlanBody;
}

export interface GetRecordsPatientPlansBody extends GetRecordsBody {
  patient: string;
  startDate: string;
  endDate: string;
}

export interface GetPatientPlansRequest {
  patientPlans: GetRecordsPatientPlansBody;
  lastPlanification: GetPlanificationInput;
}

export interface PatientPlans {
  data: PatientPlanBody[];
  meta: MetadataRecords;
}

//todo: delete response
export interface GetPatientPlansResponse {
  getLastPlanification: PlanificationBody | null;
  getPatientPlansForWeb: PatientPlanBody[];
}

export type UpdatePatientPlanInput = Omit<CreatePatientPlanInput, 'meals'> & {
  patientPlan: string;
};

export type DuplicatePatientPlanInput = UpdatePatientPlanInput;

export interface DuplicatePatientPlanRequest {
  input: DuplicatePatientPlanInput;
}

export interface DuplicatePatientPlanResponse {
  duplicatePatientPlan: PatientPlanBody;
}

export interface UpdatePatientPlanRequest {
  input: UpdatePatientPlanInput;
}

export interface UpdatePatientPlanResponse {
  updatePatientPlan: PatientPlanBody;
}
export interface DeletePatientPlanInput {
  professional: string;
  patient: string;
  patientPlan: string;
}

export interface DeletePatientPlanRequest {
  input: DeletePatientPlanInput;
}

export interface DeletePatientPlanResponse {
  deletePatientPlan: PatientPlanBody;
}

export interface PatientPlanInitialState {
  patientPlans: PatientPlanBody[];
  patientPlan: PatientPlanBody;
  mealList: MealWithStatus[];
  mealBasicInfo: MealBasicInfo;
  mealDetails: MealDetails;
}
