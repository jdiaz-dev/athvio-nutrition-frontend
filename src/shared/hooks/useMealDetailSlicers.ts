/* eslint-disable @typescript-eslint/no-unused-vars */
import * as clientPlanMealBasicInfoSlice from 'src/modules/clients/client-plans/adapters/in/slicers/MealBasicInfoSlice';
import * as clientPlanMealDetailsSlice from 'src/modules/clients/client-plans/adapters/in/slicers/MealDetailsSlice';
import * as programMealBasicInfoSlice from 'src/modules/professionals/programs/adapters/in/slicers/MealBasicInfoSlice';
import * as programMealDetailsSlice from 'src/modules/professionals/programs/adapters/in/slicers/MealDetailsSlice';
import { Modules } from 'src/shared/Consts';

const { mealBasicInfoSlice: slicer1, ...clientPlanMealBasicInfoSlicers } = clientPlanMealBasicInfoSlice;
const { mealDetailsSlice: slicer2, ...clientPlanMealDetailsSlicers } = clientPlanMealDetailsSlice;

const { mealBasicInfoSlice: slicer3, ...programMealBasicInfoSlicers } = programMealBasicInfoSlice;
const { mealDetailsSlice: slicer4, ...programMealDetailsSlicers } = programMealDetailsSlice;

export const useMealBuilderSlicers = (currentModule: string) => {
  let slicer;
  if (currentModule === Modules.CLIENTS) {
    slicer = { ...clientPlanMealBasicInfoSlicers, ...clientPlanMealDetailsSlicers };
  } else {
    slicer = { ...programMealBasicInfoSlicers, ...programMealDetailsSlicers };
  }
  return { ...slicer };
};
