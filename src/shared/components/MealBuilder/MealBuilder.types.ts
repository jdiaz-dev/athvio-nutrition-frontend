import { IngredientType } from 'src/shared/Consts';

export interface Macros {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export interface Ingredient {
  amount: number;
  name: string;
  unit: string;
  protein: number;
  carbs: number;
  fat: number;
  calories?: number;
}

interface CustomIngredient {
  name: string;
  ingredients: Ingredient[];
}

interface Equivalent {
  ingredientType: IngredientType;
  customIngredient?: CustomIngredient;
  ingredient?: Ingredient;
}

interface IngredientDetails extends Equivalent {
  equivalents: Equivalent[];
}

export interface RecipeBody {
  _id: string; // in front we manage _id, to send to back we add domain more Id, for example customRecipeId
  professional: string;
  name: string;
  ingredientDetails: IngredientDetails[];
  cookingInstructions: string;
  totalWeight: number;
  macros: Macros;
}

export type MealDataForBuilder = Omit<RecipeBody, 'professional'>;
