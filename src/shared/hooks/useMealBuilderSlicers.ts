import * as customRecipeDetailsImports from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeDetailsSlice';
import * as programMealDetailImport from 'src/modules/professionals/programs/adapters/in/slicers/MealDetailsSlice';
import * as patientPlanMealDetailsImports from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/MealDetailsSlice';
import { Modules } from 'src/shared/Consts';

const { customRecipeDetailsSlice, ...customRecipeDetailsSlicers } = customRecipeDetailsImports;
const { programPlanMealDetailsSlice, ...programPlanMealDetailSlicers } = programMealDetailImport;
const { patientPlanMealDetailsSlice, ...patientPlanMealDetailSlicers } = patientPlanMealDetailsImports;

//for custom recipes, programs and patients (all modules that contain meal details)
export const useMealBuilderSlicers = (currentModule: Modules) => {
  let slicer;
  if (currentModule === Modules.CUSTOM_RECIPES) {
    slicer = { ...customRecipeDetailsSlicers };
  } else if (currentModule === Modules.PROGRAMS) {
    slicer = { ...programPlanMealDetailSlicers };
  } else { //patient plans
    slicer = { ...patientPlanMealDetailSlicers };
  }
  return { ...slicer };
};
