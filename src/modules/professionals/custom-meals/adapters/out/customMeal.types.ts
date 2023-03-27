export type Macros = {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
};

export type IngredientType = {
  ingredientName: string;
  amount: number;
  unit: string;
  protein?: number;
  carbs?: number;
  fat?: number;
  calories?: number;
};

export type CustomMeal = {
  professionalId: string;
  name: string;
  ingredients: IngredientType[];
  recipe: string;
};

export type CreateCustomMealRequest = {
  input: {
    professionalId: string;
    name: string;
    ingredients: IngredientType[];
    recipe: string;
  };
};

export type CreateCustomMealResponse = {
  data: {
    createCustomMeal: {
      _id: string;
      name: string;
    };
  };
};

export type GetCustomMealsBody = {
  professionalId: string;
  offset: number;
  limit: number;
  search?: string[];
};
export type GetCustomMealRequest = {
  input: GetCustomMealsBody;
};

export type GetCustomMealResponse = {
  getCustomMeals: {
    data: CustomMeal[];
    meta: {
      total: number;
      offset: number;
      limit: number;
    };
  };
};
