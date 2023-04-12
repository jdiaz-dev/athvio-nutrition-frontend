import * as cutomRecipeSlicers from 'src/modules/professionals/custom-recipes/adapters/in/CustomRecipeSlice';
import * as mealPlanSlicers from 'src/modules/professionals/programs/adapters/in/slicers/MealPlanSlice';
import { Modules } from 'src/shared/Consts';

export const useChooseSlicers = (domain: string) => {
  let slicer;
  if (domain === Modules.CUSTOM_RECIPES) {
    slicer = cutomRecipeSlicers;
  } else {
    slicer = mealPlanSlicers;
  }
  return { ...slicer };
};
