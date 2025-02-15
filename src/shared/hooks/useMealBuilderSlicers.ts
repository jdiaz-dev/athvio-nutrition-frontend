import * as nutritionalMealDetailsImports from 'src/modules/professionals/nutritional-meals/adapters/in/slicers/NutritionalMealDetailsSlice';
import * as programMealDetailImport from 'src/modules/professionals/programs/adapters/in/slicers/MealDetailsSlice';
import * as patientPlanMealDetailsImports from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/MealDetailsSlice';
import { Modules } from 'src/shared/Consts';

const { nutritionalMealDetailsSlice, ...nutritionalMealDetailsSlicers } = nutritionalMealDetailsImports;
const { programPlanMealDetailsSlice, ...programPlanMealDetailSlicers } = programMealDetailImport;
const { patientPlanMealDetailsSlice, ...patientPlanMealDetailSlicers } = patientPlanMealDetailsImports;

//for nutritional meals, programs and patients (all modules that contain meal details)
export const useMealBuilderSlicers = (currentModule: Modules) => {
  let slicer;
  if (currentModule === Modules.NUTRITIONAL_MEALS) {
    slicer = { ...nutritionalMealDetailsSlicers };
  } else if (currentModule === Modules.PROGRAMS) {
    slicer = { ...programPlanMealDetailSlicers };
  } else {
    //patient plans
    slicer = { ...patientPlanMealDetailSlicers };
  }
  return { ...slicer };
};
