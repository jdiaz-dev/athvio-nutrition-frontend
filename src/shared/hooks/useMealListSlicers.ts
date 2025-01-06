import * as programMealListImport from 'src/modules/professionals/programs/adapters/in/slicers/MealsListSlice';
import * as patientPlanMealListImports from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/MealsListSlice';
import { Modules } from 'src/shared/Consts';

const { mealListSlice: slice1, ...programPlanMealListSlicerActions } = programMealListImport;
const { mealListSlice: slice2, ...patientPlanMealListSlicersActions } = patientPlanMealListImports;

//for only programs and patients modules
export const useMealListSlicers = (currentModule: Modules) => {
  let slicer;
  if (currentModule === Modules.PROGRAMS) {
    slicer = { ...programPlanMealListSlicerActions };
  } else {
    slicer = { ...patientPlanMealListSlicersActions };
  }
  return { ...slicer };
};
