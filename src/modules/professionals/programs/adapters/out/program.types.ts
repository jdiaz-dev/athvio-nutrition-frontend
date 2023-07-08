import { Meal, MealBasicInfo, MealDetails } from 'src/shared/components/MealDetails/Meal.types';
import { GetRecordsBody, MetadataRecords } from 'src/shared/types/get-records.types';

export interface Plan {
  _id: string;
  title: string;
  week: number;
  day: number;
  meals: Meal[];
}

export interface ProgramTag {
  _id: string;
  title: string;
}

export interface ProgramBody {
  _id: string;
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
  data: {
    createProgram: {
      _id: string;
      name: string;
      description: string;
    };
  };
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

export interface GetProgramsRequest {
  input: GetRecordsBody;
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
  data: {
    updateProgram: {
      _id: string;
      name: string;
    };
  };
}

export interface DeleteProgramRequest {
  input: ProgramInput;
}

export interface DeleteProgamResponse {
  deleteCustomRecipe: {
    _id: string;
    name: string;
  };
}

export interface PlanDayInfo {
  _id: string | null;
  totalMeals: number | null;
}
export type ProgramPlanDateExtendedProps = {
  plan: PlanDayInfo;
  program: string;
  planDay: number;
  planWeek: number;
};

export interface ProgramInitialState {
  programs: Programs | null;
  program: ProgramBody;
  plans: Plan[];
  plan: Plan;
  mealBasicInfo: MealBasicInfo;
  mealDetails: MealDetails;
}
