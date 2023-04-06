import { IngredientType } from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';
import { GetRecordsBody, MetadataRecords } from 'src/shared/types/get-records.types';

export interface Macros {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export interface MealPlan {
  _id: string;
  position: string;
  recipeName: string;
  ingredients: IngredientType;
  recipe: string;
  macros: Macros;
}

export interface Plan {
  _id: string;
  title: string;
  week: number;
  day: number;
  mealPlans: MealPlan[];
}

export interface ProgramTag {
  _id: string;
  title: string;
}

export interface ProgramBody {
  _id?: string;
  professional: string;
  name: string;
  description: string;
  programTags: ProgramTag[];
  plans: Plan[];
  __typename?: string;
}

export type CreateProgramBody = Pick<ProgramBody, 'professional' | 'name' | 'description'>;
export interface CreateProgramRequest {
  input: CreateProgramBody;
}

export interface UniqueProgramInput {
  professional: string;
  program: string;
}

export interface GetProgramResponse {
  getProgram: ProgramBody;
}

export interface GetProgramRequest {
  input: UniqueProgramInput;
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
  input: DeleteProgramBody;
}

export interface DeleteProgamResponse {
  deleteCustomRecipe: {
    _id: string;
    name: string;
  };
}

export interface ProgramInitialState {
  programList: Programs | null;
  programItem: ProgramBody;
}

export type DateItem = {
  title: string;
  date: Date;
  extendedProps: { plan: Plan | null; dayPlan: number };
};
