import { IngredientType } from 'src/shared/Consts';

export interface Macros {
  weightInGrams: number;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export interface Ingredient extends Macros {
  amount: number;
  name: string;
  label: string;
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
  _id: string; // in front we manage _id, to send to back we add domain more Id, for example customRecipeId
  ingredientDetails: IngredientDetail[];
  cookingInstructions: string;
  macros: Macros;
}

export type MealDataForBuilder = MealBuilderBody;
