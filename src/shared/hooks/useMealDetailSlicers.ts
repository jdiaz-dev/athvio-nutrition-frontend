/* eslint-disable @typescript-eslint/no-unused-vars */
import * as patientPlanMealBasicInfoSlice from 'src/modules/patients/patient-plans/adapters/in/slicers/MealBasicInfoSlice';
import * as patientPlanMealDetailsSlice from 'src/modules/patients/patient-plans/adapters/in/slicers/MealDetailsSlice';
import * as programMealBasicInfoSlice from 'src/modules/professionals/programs/adapters/in/slicers/MealBasicInfoSlice';
import * as programMealDetailsSlice from 'src/modules/professionals/programs/adapters/in/slicers/MealDetailsSlice';
import { Modules } from 'src/shared/Consts';

const { mealBasicInfoSlice: slicer1, ...patientPlanMealBasicInfoSlicers } = patientPlanMealBasicInfoSlice;
const { mealDetailsSlice: slicer2, ...patientPlanMealDetailsSlicers } = patientPlanMealDetailsSlice;

const { mealBasicInfoSlice: slicer3, ...programMealBasicInfoSlicers } = programMealBasicInfoSlice;
const { mealDetailsSlice: slicer4, ...programMealDetailsSlicers } = programMealDetailsSlice;

export const useMealBuilderSlicers = (currentModule: string) => {
  let slicer;
  if (currentModule === Modules.CLIENTS) {
    slicer = { ...patientPlanMealBasicInfoSlicers, ...patientPlanMealDetailsSlicers };
  } else {
    slicer = { ...programMealBasicInfoSlicers, ...programMealDetailsSlicers };
  }
  return { ...slicer };
};
