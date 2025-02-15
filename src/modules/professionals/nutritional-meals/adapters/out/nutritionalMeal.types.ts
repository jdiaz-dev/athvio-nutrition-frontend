import { MealBuilderBody } from 'src/shared/components/MealBuilder/MealBuilder.types';
import { GetRecordsBody } from 'src/shared/types/get-records.types';

export interface NutritionalMealBasicInfo {
  professional: string;
  name: string;
}
export interface NutritionalMealBody extends NutritionalMealBasicInfo, MealBuilderBody {}
export type CreateNutritionalMealBody = Omit<NutritionalMealBody, '_id'>;

export interface CreateNutritionalMealRequest {
  input: CreateNutritionalMealBody;
}

export interface CreateNutritionalMealResponse {
  createNutritionalMeal: NutritionalMealBody;
}

export interface UpdateNutritionalMealBody extends Omit<NutritionalMealBody, '_id'> {
  nutritionalMeal: string;
}

export interface UpdateNutritionalMealRequest {
  input: UpdateNutritionalMealBody;
}

export interface UpdateNutritionalMealResponse {
  updateNutritionalMeal: NutritionalMealBody;
}

export type GetNutritionalMealsBody = GetRecordsBody & { professional: string };
export interface GettNutritionalMealRequest {
  input: GetNutritionalMealsBody;
}

export interface NutritionalMeals {
  data: NutritionalMealBody[];
  meta: {
    total: number;
    offset: number;
    limit: number;
  };
}
export interface GetNutritionalMealsResponse {
  getNutritionalMeals: NutritionalMeals;
}

export interface DeleteNutritionalMealBody {
  professional: string;
  nutritionalMeal: string;
}

export interface DeleteNutritionalMealRequest {
  input: DeleteNutritionalMealBody;
}

export interface DeleteNutritionalMealResponse {
  deleteNutritionalMeal: {
    _id: string;
    name: string;
  };
}

export interface NutritionalMealInitialState {
  nutritionalMeals: NutritionalMeals | null;
  nutritionalMealBasicInfo: NutritionalMealBasicInfo;
  nutritionalMealDetails: MealBuilderBody;
}
