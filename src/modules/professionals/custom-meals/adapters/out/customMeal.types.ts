import { GetRecordsBody } from 'src/shared/types/get-records.types';

export interface Macros {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export interface IngredientType {
  ingredientName: string;
  amount: number;
  unit: string;
  protein?: number;
  carbs?: number;
  fat?: number;
  calories?: number;
  __typename?: string;
}

export interface CustomMealBody {
  _id?: string;
  professional: string;
  name: string;
  ingredients: IngredientType[];
  recipe: string;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalCalories: number;
  __typename?: string;
}

export interface CreateCustomMealRequest {
  input: CustomMealBody;
}

export interface CreateCustomMealResponse {
  data: {
    createCustomMeal: {
      _id: string;
      name: string;
    };
  };
}

export interface UpdateCustomMealBody extends Omit<CustomMealBody, '_id'> {
  customMeal: string;
}

export interface UpdateCustomMealRequest {
  input: UpdateCustomMealBody;
}

export interface UpdateCustomMealResponse {
  data: {
    updateCustomMeal: {
      _id: string;
      name: string;
    };
  };
}

export interface GetCustomMealRequest {
  input: GetRecordsBody;
}

export interface CustomMeals {
  data: CustomMealBody[];
  meta: {
    total: number;
    offset: number;
    limit: number;
  };
}
export interface GetCustomMealsResponse {
  getCustomMeals: CustomMeals;
}

export interface DeleteCustomMealBody {
  professional: string;
  customMeal: string;
}

export interface DeleteCustomMealRequest {
  input: DeleteCustomMealBody;
}

export interface DeleteCustomMealResponse {
  deleteCustomMeal: {
    _id: string;
    name: string;
  };
}

export interface CustomMealInitialState {
  customMealList: CustomMeals | null;
  customMealItem: CustomMealBody;
}
