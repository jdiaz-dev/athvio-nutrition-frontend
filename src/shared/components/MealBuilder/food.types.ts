import { Macros } from 'src/shared/components/MealBuilder/MealBuilder.types';

export type GetFoodDatabasesResponse = {
  getFoodDatabases: string[];
};

export type GetAutocompleteFoodNamesRequest = {
  input: {
    professional: string;
    search: string;
    foodDatabase: string;
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
  search?: string[];
  session?: number;
}
export type GetFoodRequest = {
  input: InputGetFoods;
};

interface Measure {
  uri: string;
  label: string;
  weight: number;
}

interface DefaultMeasure {
  amount: number;
  unit: string;
}
export type Food = {
  name: string;
  macros: Macros;
  defaultMeasure: DefaultMeasure;
  measures: Measure[];
};

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
