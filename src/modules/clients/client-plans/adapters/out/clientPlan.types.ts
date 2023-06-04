import { Meal, MealBasicInfo, MealDetails } from 'src/modules/professionals/programs/adapters/out/program.types';
import { GetRecordsBody, MetadataRecords } from 'src/shared/types/get-records.types';

export interface Plan {
  _id: string;
  title: string;
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
  data: {
    createClientPlan: {
      _id: string;
      assignedDate: string;
      title: string;
    };
  };
}

/* export interface GetClientPlanRequest {
  input: ProgramInput;
}

export interface GetClientPlanResponse {
  getClientPlan: ClientPlanBody;
} */

export interface GetClientPlansRequest {
  input: GetRecordsBody;
}

export interface ClientPlans {
  data: ClientPlanBody[];
  meta: MetadataRecords;
}
export interface GetClientPlansResponse {
  getClientPlans: ClientPlans;
}

export interface UpdateClientPlanInput extends CreateClientPlanInput {
  clientPlan: string;
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
  clientPlans: ClientPlans | null;
  clientPlan: ClientPlanBody;
  mealBasicInfo: MealBasicInfo;
  mealDetails: MealDetails;
}
