import { IngredientType, MealDataForBuilder } from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';
import { GetRecordsBody, MetadataRecords } from 'src/shared/types/get-records.types';

export interface Macros {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export interface MealPlan {
  _id: string;
  position: number;
  name: string;
  ingredients: IngredientType[];
  cookingInstruction: string;
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
}

export type CreateProgramBody = Pick<ProgramBody, 'professional' | 'name' | 'description'>;
export interface CreateProgramRequest {
  input: CreateProgramBody;
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
  input: ProgramInput;
}

export interface DeleteProgamResponse {
  deleteCustomRecipe: {
    _id: string;
    name: string;
  };
}

export interface ProgramInitialState {
  programs: Programs | null;
  program: ProgramBody;
  mealPlan: MealDataForBuilder;
}

export type DateItem = {
  title: string;
  date: Date;
  extendedProps: { plan: Plan | null; program: string; dayPlan: number };
};
