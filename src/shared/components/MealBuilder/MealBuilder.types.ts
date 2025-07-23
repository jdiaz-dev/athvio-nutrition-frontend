import { IngredientType } from 'src/shared/Consts';

export interface Macros {
  weightInGrams: number;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export interface Ingredient extends Macros {
  amount: string;
  name: string;
  label: string;
  internalFood?: string;
}
export interface DisplayedIngredient extends Ingredient {
  ingredientType: IngredientType;
}
export interface CustomIngredient {
  amount: number;
  name: string;
  label: string;
  ingredients: Ingredient[];
  macros: Macros;
}

interface Equivalent {
  ingredientType: IngredientType;
  customIngredient?: CustomIngredient;
  ingredient?: Ingredient;
}

export interface IngredientDetail extends Equivalent {
  equivalents: Equivalent[];
}

export interface MealBuilderBody {
  uuid: string; // in front we manage uuid, to send to back we add domain more Id, for example nutritionalMealId
  ingredientDetails: IngredientDetail[];
  cookingInstructions: string;
  macros: Macros;
}

export type MealDataForBuilder = MealBuilderBody;
