import { MealBuilderBody } from 'src/shared/components/MealBuilder/MealBuilder.types';
import { GetRecordsBody } from 'src/shared/types/get-records.types';

export interface CustomRecipeBasicInfo {
  professional: string;
  name: string;
}
export interface CustomRecipeBody extends CustomRecipeBasicInfo, MealBuilderBody {}
export type CreateCustomRecipeBody = Omit<CustomRecipeBody, '_id'>;

export interface CreateCustomRecipeRequest {
  input: CreateCustomRecipeBody;
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
  customRecipeBasicInfo: CustomRecipeBasicInfo;
  customRecipeDetails: MealBuilderBody;
}
