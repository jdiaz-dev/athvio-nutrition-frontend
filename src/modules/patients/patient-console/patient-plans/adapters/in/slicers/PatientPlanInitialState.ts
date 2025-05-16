import { PatientPlanInitialState } from 'src/modules/patients/patient-console/patient-plans/adapters/out/patientPlan.types';
import { defaultMealTagKey } from 'src/shared/Consts';
import dayjs from 'dayjs';

export const patientPlanInitialState: PatientPlanInitialState = {
  patientPlans: [],
  patientPlan: {
    _id: '',
    patient: '',
    title: '',
    assignedDate: dayjs().toString(),
    meals: [],
  },
  mealBasicInfo: {
    position: 0,
    mealTag: defaultMealTagKey,
    name: 'Meal name',
  },
  mealList: [],
  mealDetails: {
    _id: '',
    ingredientDetails: [],
    cookingInstructions: '',
    macros: {
      protein: 0,
      carbs: 0,
      fat: 0,
      calories: 0,
      weightInGrams: 0,
    },
  },
};
