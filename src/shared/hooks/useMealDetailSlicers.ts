import * as patientPlanMealBasicInfoSlice from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/MealBasicInfoSlice';
import * as programMealBasicInfoSlice from 'src/modules/professionals/programs/adapters/in/slicers/MealBasicInfoSlice';
import { Modules } from 'src/shared/Consts';

const { patientPlanMealBasicInfoSlice: slicer1, ...patientPlanMealBasicInfoSlicers } = patientPlanMealBasicInfoSlice;

const { programPlanMealBasicInfoSlice: slicer3, ...programMealBasicInfoSlicers } = programMealBasicInfoSlice;

//only for patients and programs modules
export const useMealDetailsSlicers = (currentModule: Modules) => {
  let slicer;
  if (currentModule === Modules.CLIENTS) {
    slicer = { ...patientPlanMealBasicInfoSlicers };
  } else {
    slicer = { ...programMealBasicInfoSlicers };
  }
  return { ...slicer };
};
