import * as customRecipeSlicers from 'src/modules/professionals/custom-recipes/adapters/in/CustomRecipeSlice';
import * as mealPlanSlicers from 'src/modules/professionals/programs/adapters/in/slicers/MealPlanSlice';
import { Modules } from 'src/shared/Consts';

export const useChooseSlicers = (domain: string) => {
  let slicer;
  if (domain === Modules.CUSTOM_RECIPES) {
    slicer = customRecipeSlicers;
  } else {
    // slicer = mealPlanSlicers;
    mealPlanSlicers;
    slicer = customRecipeSlicers;
  }
  return { ...slicer };
};
