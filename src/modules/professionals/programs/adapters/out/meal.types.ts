import { ProgramBody } from 'src/modules/professionals/programs/adapters/out/program.types';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';

interface MealBody {
  uuid: string;
  professional: string;
  program: string;
  plan: string;
  mealBody: Meal;
}
export interface CreateMealBody extends Omit<MealBody, 'uuid' | 'mealBody'> {
  meals: Omit<Meal, 'uuid'>[];
}

export interface UpdateMealBody extends Omit<MealBody, 'uuid' | 'mealBody'> {
  meals: (Omit<Meal, 'uuid'> & { meal: string })[];
}

export interface DeleteMealBody extends Omit<MealBody, 'uuid' | 'mealBody'> {
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
