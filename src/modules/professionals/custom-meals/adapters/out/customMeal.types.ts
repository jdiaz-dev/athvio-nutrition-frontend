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
}

export interface CustomMealBody {
  _id?: string;
  professional: string;
  name: string;
  ingredients: IngredientType[];
  recipe: string;
}

export interface CreateCustomMealRequest {
  input: CustomMealBody;
}

export interface CreateCustomMealResponse {
  data: {
    updateCustomMeal: {
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

export interface GetCustomMealsBody {
  professional: string;
  offset: number;
  limit: number;
  search?: string[];
}
export interface GetCustomMealRequest {
  input: GetCustomMealsBody;
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

export interface CustomMealInitialState {
  customMealList: CustomMeals | null;
  customMealItem: CustomMealBody;
}
