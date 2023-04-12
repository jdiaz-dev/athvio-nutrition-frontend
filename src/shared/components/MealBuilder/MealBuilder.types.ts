export interface Macros {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export interface IngredientType {
  amount: number;
  name: string;
  unit: string;
  protein?: number;
  carbs?: number;
  fat?: number;
  calories?: number;
}

export interface RecipeBody {
  _id: string; // in front we manage _id, to send to back we add domain more Id, for example customRecipeId
  professional: string;
  name: string;
  ingredients: IngredientType[];
  cookingInstruction: string;
  macros: Macros;
}

export type MealDataForBuilder = Omit<RecipeBody, 'professional'>;
