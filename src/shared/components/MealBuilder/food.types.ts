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

export type InputGetFoods = {
  professional: string;
  offset: number;
  limit: number;
  foodDatabase: string;
  targetLanguage: string;
  search?: string[];
  session?: number;
};

export type Measure = {
  uri: string;
  label: string;
  spanishLabel?: string;
  weightInGrams: number;
};

export type Nutrient = {
  label: string;
  spanishLabel: string | null;
  quantity: number;
  unit: string;
};

export type NutrientDetails = {
  CA?: Nutrient;
  CHOCDF_NET?: Nutrient;
  CHOCDF?: Nutrient;
  CHOLE?: Nutrient;
  ENERC_KCAL?: Nutrient;
  FAMS?: Nutrient;
  FAT?: Nutrient;
  FAPU?: Nutrient;
  FASAT?: Nutrient;
  FATRN?: Nutrient;
  FIBTG?: Nutrient;
  FOLDFE?: Nutrient;
  FOLFD?: Nutrient;
  FOLAC?: Nutrient;
  FE?: Nutrient;
  K?: Nutrient;
  MG?: Nutrient;
  NA?: Nutrient;
  NIA?: Nutrient;
  P?: Nutrient;
  PROCNT?: Nutrient;
  RIBF?: Nutrient;
  SUGAR?: Nutrient;
  SUGAR_ADDED?: Nutrient;
  THIA?: Nutrient;
  TOCPHA?: Nutrient;
  VITA_RAE?: Nutrient;
  VITB12?: Nutrient;
  VITB6A?: Nutrient;
  VITC?: Nutrient;
  VITD?: Nutrient;
  VITK1?: Nutrient;
  WATER?: Nutrient;
  ZN?: Nutrient;
};

export type Food = {
  uuid?: string;
  foodId?: string;
  foodDatabase: FoodDatabases;
  name: string;
  macros: Macros;
  ingredientDetails?: IngredientDetail[];
  availableMeasures?: Measure[];
  nutrientDetails: NutrientDetails;
};

type EstablishedMeasure = {
  amount: number;
  label: string;
  weightInGrams: number;
  uri: string;
};
export type FoodManager = Food & {
  measure: EstablishedMeasure;
};

type FoodProviderSession = {
  title: string;
  nextSession: number;
};

export type GetFoodRequest = {
  input: InputGetFoods;
};

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
