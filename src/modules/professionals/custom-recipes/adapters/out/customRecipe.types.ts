import { GetRecordsBody } from 'src/shared/types/get-records.types';

export interface Macros {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  __typename?: string;
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

export interface CustomRecipeBody {
  _id?: string; // in front we manage _id, to send to back we add domain more Id, for example customRecipeId
  professional: string;
  name: string;
  ingredients: IngredientType[];
  cookingInstruction: string;
  macros: Macros;
  __typename?: string;
}

export type MealDataForBuilder = Pick<CustomRecipeBody, '_id' | 'name' | 'ingredients' | 'cookingInstruction' | 'macros'>;

export interface CreateCustomRecipeRequest {
  input: CustomRecipeBody;
}

export interface CreateCustomRecipeResponse {
  data: {
    createCustomRecipe: {
      _id: string;
      name: string;
    };
  };
}

export interface UpdateCustomRecipeBody extends Omit<CustomRecipeBody, '_id'> {
  customRecipe: string;
}

export interface UpdateCustomRecipeRequest {
  input: UpdateCustomRecipeBody;
}

export interface UpdateCustomRecipeResponse {
  data: {
    updateCustomRecipe: {
      _id: string;
      name: string;
    };
  };
}

export interface GetCustomRecipeRequest {
  input: GetRecordsBody;
}

export interface CustomRecipes {
  data: CustomRecipeBody[];
  meta: {
    total: number;
    offset: number;
    limit: number;
  };
}
export interface GetCustomRecipesResponse {
  getCustomRecipes: CustomRecipes;
}

export interface DeleteCustomRecipeBody {
  professional: string;
  customRecipe: string;
}

export interface DeleteCustomRecipeRequest {
  input: DeleteCustomRecipeBody;
}

export interface DeleteCustomRecipeResponse {
  deleteCustomRecipe: {
    _id: string;
    name: string;
  };
}

export interface CustomRecipeInitialState {
  customRecipes: CustomRecipes | null;
  customRecipe: CustomRecipeBody;
}
