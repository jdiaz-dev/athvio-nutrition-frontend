import { Meal, MealBasicInfo, MealDetails } from 'src/shared/components/PlanDetailDialog/Meal.types';
import { GetRecordsBody, MetadataRecords } from 'src/shared/types/get-records.types';

export interface Plan {
  _id: string;
  title?: string;
  week: number;
  day: number;
  meals: Meal[];
}

export interface ClientPlanBody extends Omit<Plan, 'week' | 'day'> {
  client: string;
  assignedDate: Date;
  // comments
  // commentResult
}

export interface CreateClientPlanInput extends Pick<ClientPlanBody, 'client' | 'assignedDate' | 'title'> {
  professional: string;
}

export interface CreateClientPlanRequest {
  input: CreateClientPlanInput;
}

export interface CreateClientPlanResponse {
  createClientPlan: ClientPlanBody;
}

export interface GetRecordsClientPlansBody extends GetRecordsBody {
  client: string;
}
/* export interface GetClientPlanRequest {
  input: ProgramInput;
}

export interface GetClientPlanResponse {
  getClientPlan: ClientPlanBody;
} */

export interface GetClientPlansRequest {
  input: GetRecordsClientPlansBody;
}

export interface ClientPlans {
  data: ClientPlanBody[];
  meta: MetadataRecords;
}
export interface GetClientPlansResponse {
  getClientPlans: ClientPlanBody[];
}

export interface UpdateClientPlanInput extends CreateClientPlanInput {
  clientPlan: string;
}

export type DuplicateClientPlanInput = UpdateClientPlanInput;

export interface DuplicateClientPlanRequest {
  input: DuplicateClientPlanInput;
}

export interface DuplicateClientPlanResponse {
  duplicateClientPlan: ClientPlanBody;
}

export interface UpdateClientPlanRequest {
  input: UpdateClientPlanInput;
}

export interface UpdateClientPlanResponse {
  data: {
    updateClientPlan: ClientPlanBody;
  };
}
export interface DeleteClientPlanInput {
  professional: string;
  client: string;
  clientPlan: string;
}

export interface DeleteClientPlanRequest {
  input: DeleteClientPlanInput;
}

export interface DeleteClientPlanResponse {
  deleteCustomRecipe: ClientPlanBody;
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
  clientPlans: ClientPlanBody[];
  clientPlan: ClientPlanBody;
  mealBasicInfo: MealBasicInfo;
  mealDetails: MealDetails;
}
