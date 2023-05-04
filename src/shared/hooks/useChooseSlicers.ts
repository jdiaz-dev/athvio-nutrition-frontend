import * as customRecipeDetailsImports from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeDetailsSlice';
import * as mealPlanSlicers from 'src/modules/professionals/programs/adapters/in/slicers/MealPlanSlice';
import { Modules } from 'src/shared/Consts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { custoRecipeDetailsSlice, ...customRecipeDetailsSlicers } = customRecipeDetailsImports;
export const useChooseSlicers = (domain: string) => {
  let slicer;
  if (domain === Modules.CUSTOM_RECIPES) {
    slicer = customRecipeDetailsSlicers;
    customRecipeDetailsSlicers;
  } else {
    // slicer = mealPlanSlicers;
    mealPlanSlicers;
    slicer = customRecipeDetailsSlicers;
  }
  return { ...slicer };
};
