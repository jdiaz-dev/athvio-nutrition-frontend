import { MealBuilderBody } from 'src/shared/components/MealBuilder/MealBuilder.types';
import { MealImageSources, MealSourceEnum, NutritionalMealDatabasesEnum } from 'src/shared/Consts';
import { GetRecordsBody } from 'src/shared/types/get-records.types';

export type NutritionalMealBasicInfo = {
  professional: string;
  name: string;
  source: MealSourceEnum;
  image: File | string | null;
  imageSource?: MealImageSources;
};

export type NutritionalMealBody = NutritionalMealBasicInfo & MealBuilderBody;
export type CreateNutritionalMealBody = Omit<NutritionalMealBody, 'uuid' | 'source' | 'image'> & {
  image?: File | string | null;
};

export type CreateNutritionalMealRequest = {
  input: CreateNutritionalMealBody;
};

export type CreateNutritionalMealResponse = {
  createNutritionalMeal: NutritionalMealBody;
};

export type UpdateNutritionalMealBody = CreateNutritionalMealBody & {
  nutritionalMeal: string;
};

export type UpdateNutritionalMealRequest = {
  input: UpdateNutritionalMealBody;
};

export type UpdateNutritionalMealResponse = {
  updateNutritionalMeal: NutritionalMealBody;
};

export type GetNutritionalMealsBody = GetRecordsBody & {
  professional: string;
  database: NutritionalMealDatabasesEnum;
  language: string;
};

export type GettNutritionalMealRequest = {
  input: GetNutritionalMealsBody;
};

export type NutritionalMeals = {
  data: NutritionalMealBody[];
  meta: {
    total: number;
    offset: number;
    limit: number;
  };
};
export type GetNutritionalMealsResponse = {
  getNutritionalMealsForProfessional: NutritionalMeals;
};

export type GetNutritionalMealDatabasesResponse = {
  getNutritionalMealDatabases: string[];
};

export type DeleteNutritionalMealBody = {
  professional: string;
  nutritionalMeal: string;
};

export type DeleteNutritionalMealRequest = {
  input: DeleteNutritionalMealBody;
};

export type DeleteNutritionalMealResponse = {
  deleteNutritionalMeal: {
    uuid: string;
    name: string;
  };
};

export type NutritionalMealInitialState = {
  nutritionalMeals: NutritionalMeals | null;
  nutritionalMealBasicInfo: Omit<NutritionalMealBasicInfo, 'source'>;
  nutritionalMealDetails: MealBuilderBody;
};
