import * as patientPlanMealBasicInfoSlice from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/MealBasicInfoSlice';
import * as programMealBasicInfoSlice from 'src/modules/professionals/programs/adapters/in/slicers/MealBasicInfoSlice';
import { Modules } from 'src/shared/Consts';
import * as nutritionalMealBasicInfoSlice from 'src/modules/professionals/nutritional-meals/adapters/in/slicers/NutritionalMealBasicInfo';

const { patientPlanMealBasicInfoSlice: slicer1, ...patientPlanMealBasicInfoSlicers } = patientPlanMealBasicInfoSlice;

const { programPlanMealBasicInfoSlice: slicer3, ...programMealBasicInfoSlicers } = programMealBasicInfoSlice;

//only for patients and programs modules
export const useMealBasicInfoSlicers = (currentModule: Modules) => {
  let slicer;
  if (currentModule === Modules.CLIENT_PLANS) {
    slicer = { ...patientPlanMealBasicInfoSlicers };
  } else {
    slicer = { ...programMealBasicInfoSlicers };
  }
  return { ...slicer };
};

export const useMealImageSlicers = (currentModule: Modules) => {
  let slicer;
  if (currentModule === Modules.NUTRITIONAL_MEALS) {
    const { setImage } = nutritionalMealBasicInfoSlice;
    slicer = { setImage };
  } else if (currentModule === Modules.CLIENT_PLANS) {
    const { setImage } = patientPlanMealBasicInfoSlicers;
    slicer = { setImage };
  } else {
    const { setImage } = programMealBasicInfoSlicers;
    slicer = { setImage };
  }
  return { ...slicer };
};
