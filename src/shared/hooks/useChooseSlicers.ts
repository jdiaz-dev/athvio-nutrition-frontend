import * as cutomRecipeSlicers from 'src/modules/professionals/custom-recipes/adapters/in/CustomRecipeSlice';
import * as programSlicers from 'src/modules/professionals/programs/adapters/in/ProgramSlice';
import { Modules } from 'src/shared/Consts';

export const useChooseSlicers = (domain: string) => {
  let slicer;
  if (domain === Modules.CUSTOM_RECIPES) {
    slicer = cutomRecipeSlicers;
  } else {
    slicer = programSlicers;
  }

  return { ...slicer };
};
