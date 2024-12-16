import * as programMealListImport from 'src/modules/professionals/programs/adapters/in/slicers/MealsListSlice';
import * as patientPlanMealListImports from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/MealsListSlice';
import { Modules } from 'src/shared/Consts';

const { mealListSlice: slice1, ...programPlanMealListSlicers } = programMealListImport;
const { mealListSlice: slice2, ...patientPlanMealListSlicers } = patientPlanMealListImports;

//for only programs and patients modules
export const useMealListSlicers = (currentModule: Modules) => {
  let slicer;
  if (currentModule === Modules.PROGRAMS) {
    slicer = { ...programPlanMealListSlicers };
  } else {
    slicer = { ...patientPlanMealListSlicers };
  }
  return { ...slicer };
};
