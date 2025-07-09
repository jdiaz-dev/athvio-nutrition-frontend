import { Meal, MealBasicInfo, MealDetails } from 'src/shared/components/PlanDetailDialog/Meal.types';
import { MealWithStatus } from 'src/shared/components/PlanDetailDialog/MealList';
import { GetRecordsBody, MetadataRecords } from 'src/shared/types/get-records.types';
import { PlanDayInfo } from 'src/shared/types/types';

export interface Plan {
  uuid: string;
  title: string;
  week: number;
  day: number;
  meals: Meal[];
}

export interface ProgramTag {
  uuid: string;
  title: string;
}

export interface ProgramBody {
  uuid: string;
  professional: string;
  name: string;
  description: string;
  programTags: ProgramTag[];
  plans: Plan[];
}

export type CreateProgramBody = Pick<ProgramBody, 'professional' | 'name' | 'description'>;
export interface CreateProgramRequest {
  input: CreateProgramBody;
}

export interface CreateProgramResponse {
  createProgram: ProgramBody;
}

export interface ProgramInput {
  professional: string;
  program: string;
}

export interface GetProgramResponse {
  getProgram: ProgramBody;
}

export interface GetProgramRequest {
  input: ProgramInput;
}

export type GetProgramsBody = GetRecordsBody & { professional: string };
export interface GetProgramsRequest {
  input: GetProgramsBody;
}

export interface Programs {
  data: ProgramBody[];
  meta: MetadataRecords;
}
export interface GetProgramsResponse {
  getPrograms: Programs;
}

export interface UpdateProgramBody extends Pick<ProgramBody, 'professional' | 'name' | 'description'> {
  program: string;
}

export interface UpdateProgramRequest {
  input: UpdateProgramBody;
}

export interface UpdateProgramResponse {
  updateProgram: ProgramBody;
}

export interface DeleteProgramRequest {
  input: ProgramInput;
}

export interface DeleteProgamResponse {
  deleteProgram: {
    uuid: string;
    name: string;
  };
}

export type ProgramPlanDateExtendedProps = {
  planDayInfo: PlanDayInfo;
  program: string;
  planDay: number;
  planWeek: number;
};

export interface ProgramInitialState {
  programs: Programs | null;
  program: { data: ProgramBody; loading: boolean; error: string | null };
  plans: Plan[];
  plan: Plan;
  mealList: MealWithStatus[];
  mealBasicInfo: MealBasicInfo;
  mealDetails: MealDetails;
}
