import { Meal, ProgramBody } from 'src/modules/professionals/programs/adapters/out/program.types';

interface MealBody {
  _id: string;
  professional: string;
  program: string;
  plan: string;
  mealBody: Meal;
}
export interface CreateMealBody extends Omit<MealBody, '_id' | 'mealBody'> {
  mealBody: Omit<Meal, '_id'>;
}

export interface CreateMealRequest {
  input: CreateMealBody;
}

export interface CreateMealResponse {
  createMeal: ProgramBody;
}

export interface UpdateMealBody extends Omit<MealBody, '_id' | 'mealBody'> {
  meal: string;
  mealBody: Pick<Meal, 'position' | 'mealTag'>;
}

export interface UpdateMealRequest {
  input: UpdateMealBody;
}

export interface UpdateMealResponse {
  updateMeal: ProgramBody;
}

export interface DeleteMealBody extends Omit<MealBody, '_id' | 'mealBody'> {
  meal: string;
}

export interface DeleteMealRequest {
  input: DeleteMealBody;
}

export interface DeleteMealResponse {
  deleteMeal: ProgramBody;
}
