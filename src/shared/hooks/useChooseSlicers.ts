/* eslint-disable @typescript-eslint/no-unused-vars */
import * as customRecipeDetailsImports from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeDetailsSlice';
import * as ProgramMealDetailImport from 'src/modules/professionals/programs/adapters/in/slicers/MealDetailsSlice';
import { Modules } from 'src/shared/Consts';

const { custoRecipeDetailsSlice, ...customRecipeDetailsSlicers } = customRecipeDetailsImports;
const { mealDetailsSlice, ...programMealDetailSlicers } = ProgramMealDetailImport;
export const useChooseSlicers = (domain: string) => {
  let slicer;
  if (domain === Modules.CUSTOM_RECIPES) {
    slicer = customRecipeDetailsSlicers;
    customRecipeDetailsSlicers;
  } else {
    // slicer = mealPlanSlicers;
    slicer = programMealDetailSlicers;
  }
  return { ...slicer };
};
