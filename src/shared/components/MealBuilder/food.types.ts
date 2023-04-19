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

export type GetFoodRequest = {
  input: {
    professional: string;
    offset: number;
    limit: number;
    foodDatabase: string;
    search?: string[];
  };
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

export type GetFoodsResponse = {
  getFoods: {
    data: Food[];
    meta: {
      total: number;
      limit: number;
      offset: number;
    };
  };
};
