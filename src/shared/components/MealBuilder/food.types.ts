import { IngredientDetail, Macros } from 'src/shared/components/MealBuilder/MealBuilder.types';
import { FoodDatabases } from 'src/shared/Consts';

export type GetFoodDatabasesResponse = {
  getFoodDatabases: string[];
};

export type GetAutocompleteFoodNamesRequest = {
  input: {
    professional: string;
    search: string;
    foodDatabase: string;
    targetLanguage: string;
  };
};

export type GetAutocompleteFoodNamesResponse = {
  getAutoCompleteFoodNames: {
    foodNames: string[];
  };
};

export interface InputGetFoods {
  professional: string;
  offset: number;
  limit: number;
  foodDatabase: string;
  targetLanguage: string;
  search?: string[];
  session?: number;
}
export type GetFoodRequest = {
  input: InputGetFoods;
};

export interface Measure {
  uri: string;
  label: string;
  weightInGrams: number;
}

export type Food = {
  uuid?: string;
  foodId?: string;
  foodDatabase: FoodDatabases;
  name: string;
  macros: Macros;
  ingredientDetails?: IngredientDetail[];
  availableMeasures?: Measure[];
};
interface EstablishedMeasure {
  amount: number;
  label: string;
  weightInGrams: number;
}
export interface FoodManager extends Food {
  measure: EstablishedMeasure;
}

interface FoodProviderSession {
  title: string;
  nextSession: number;
}

export type GetFoodsResponse = {
  getFoods: {
    data: Food[];
    meta: {
      total: number;
      limit: number;
      offset: number;
      foodProviderSessions: FoodProviderSession | null;
    };
  };
};
