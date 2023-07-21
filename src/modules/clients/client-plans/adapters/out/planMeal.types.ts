import { ClientPlanBody } from 'src/modules/clients/client-plans/adapters/out/clientPlan.types';
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
  client: string;
  clientPlan: string;
  mealBody: Omit<Meal, '_id'>;
}

export type CreateClientPlanMealInput = PlanMealBody;

export interface AddClientPlanRequest {
  input: CreateClientPlanMealInput;
}

export interface AddClientPlanResponse {
  addPlanMeal: ClientPlanBody;
}

export interface GetClientPlansRequest {
  input: GetRecordsBody;
}

export interface ClientPlans {
  data: ClientPlanBody[];
  meta: MetadataRecords;
}
/* export interface GetClientPlansResponse {
  getClientPlans: ClientPlans;
} */

export interface UpdateClientPlanMealInput extends CreateClientPlanMealInput {
  meal: string;
}

export interface UpdatePlanMealRequest {
  input: UpdateClientPlanMealInput;
}

export interface UpdatePlanMealResponse {
  updatePlanMeal: ClientPlanBody;
}

export interface DeletePlanMealInput {
  professional: string;
  client: string;
  clientPlan: string;
  meal: string;
}

export interface DeletePlanMealRequest {
  input: DeletePlanMealInput;
}

export interface DeletePlanMealResponse {
  deletePlanMeal: ClientPlanBody;
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

export interface ClientPlanInitialState {
  clientPlans: ClientPlans | null;
  clientPlan: ClientPlanBody;
  mealBasicInfo: MealBasicInfo;
  mealDetails: MealDetails;
}
