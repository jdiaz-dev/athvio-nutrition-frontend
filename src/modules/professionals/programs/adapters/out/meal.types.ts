import { ProgramBody } from 'src/modules/professionals/programs/adapters/out/program.types';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';

interface MealBody {
  _id: string;
  professional: string;
  program: string;
  plan: string;
  mealBody: Meal;
}
export interface CreateMealBody extends Omit<MealBody, '_id' | 'mealBody'> {
  meals: Omit<Meal, '_id'>[];
}

export interface UpdateMealBody extends Omit<MealBody, '_id' | 'mealBody'> {
  meals: (Omit<Meal, '_id'> & { meal: string })[];
}

export interface DeleteMealBody extends Omit<MealBody, '_id' | 'mealBody'> {
  meals: string[];
}

export interface ProgramPlanMealCrudRequest {
  toAddInput: CreateMealBody;
  toUpdateInput: UpdateMealBody;
  toDeleteInput: DeleteMealBody;
  shouldToAdd: boolean;
  shouldToUpdate: boolean;
  shouldToDelete: boolean;
}

export interface ProgramPlanMealCrudResponse {
  createMeal: ProgramBody;
  updateMeal: ProgramBody;
  deleteMeal: ProgramBody;
}
