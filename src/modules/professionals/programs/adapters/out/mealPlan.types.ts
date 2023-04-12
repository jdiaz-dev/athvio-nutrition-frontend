import { MealPlan, ProgramBody } from 'src/modules/professionals/programs/adapters/out/program.types';

interface MealPlanBody {
  professional: string;
  _id: string;
  program: string;
  plan: string;
  mealPlanBody: MealPlan;
}
export interface CreateMealPlanBody extends Omit<MealPlanBody, '_id' | 'mealPlanBody'> {
  mealPlanBody: Omit<MealPlan, '_id'>;
}

export interface CreateMealPlanRequest {
  input: CreateMealPlanBody;
}

export interface CreateMealPlanProgramResponse {
  createMealPlan: ProgramBody;
}

export interface UpdateMealPlanBody extends Omit<MealPlanBody, '_id' | 'mealPlanBody'> {
  mealPlan: string;
  mealPlanBody: Omit<MealPlan, '_id'>;
}

export interface UpdateMealPlanRequest {
  input: UpdateMealPlanBody;
}

export interface UpdateMealPlanResponse {
  updateMealPlan: ProgramBody;
}

export interface DeleteMealPlanBody extends Omit<MealPlanBody, '_id' | 'mealPlanBody'> {
  mealPlan: string;
}

export interface DeleteMealPlanRequest {
  input: DeleteMealPlanBody;
}

export interface DeleteMealPlanResponse {
  deleteMealPlan: ProgramBody;
}
