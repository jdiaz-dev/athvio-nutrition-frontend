import { ProgramInitialState } from 'src/modules/professionals/programs/adapters/out/program.types';

export const defaultMealTag = 'First meal';
export const programInitialState: ProgramInitialState = {
  programs: null,
  program: {
    professional: '',
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
    mealTag: defaultMealTag,
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
