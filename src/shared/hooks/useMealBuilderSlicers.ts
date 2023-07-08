/* eslint-disable @typescript-eslint/no-unused-vars */
import * as customRecipeDetailsImports from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeDetailsSlice';
import * as ProgramMealDetailImport from 'src/modules/professionals/programs/adapters/in/slicers/MealDetailsSlice';
import { Modules } from 'src/shared/Consts';

const { customRecipeDetailsSlice, ...customRecipeDetailsSlicers } = customRecipeDetailsImports;
const { mealDetailsSlice, ...programMealDetailSlicers } = ProgramMealDetailImport;

export const useMealBuilderSlicers = (currentModule: string) => {
  let slicer;
  if (currentModule === Modules.CUSTOM_RECIPES) {
    slicer = customRecipeDetailsSlicers;
    customRecipeDetailsSlicers;
  } else {
    slicer = programMealDetailSlicers;
  }
  return { ...slicer };
};
