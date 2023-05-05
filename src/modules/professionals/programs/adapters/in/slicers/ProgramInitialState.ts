import { ProgramInitialState } from 'src/modules/professionals/programs/adapters/out/program.types';
import { getUserFromLocalStorage } from 'src/shared/helpers/LocalStorage';

export const programInitialState: ProgramInitialState = {
  programs: null,
  program: {
    professional: getUserFromLocalStorage()._id,
    _id: '',
    name: '',
    description: '',
    programTags: [],
    plans: [],
  },
  plans: [],
  plan: {
    _id: '',
    title: '',
    week: 0,
    day: 0,
    meals: [],
  },
  mealBasicInfo: {
    position: 0,
    mealTag: '',
    name: 'Meal name',
  },
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
