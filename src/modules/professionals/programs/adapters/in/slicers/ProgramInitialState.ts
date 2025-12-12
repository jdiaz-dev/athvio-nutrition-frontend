import { defaultMealTagKey } from 'src/shared/Consts';
import { ProgramInitialState } from 'src/modules/professionals/programs/adapters/out/program.types';

export const programInitialState: ProgramInitialState = {
  programs: null,
  program: {
    data: { professional: '', uuid: '', name: '', description: '', programTags: [], plans: [] },
    loading: false,
    error: null,
  },
  plans: [],
  plan: {
    uuid: '',
    title: '',
    week: 0,
    day: 0,
    meals: [],
  },
  mealList: [],
  mealBasicInfo: {
    position: 0,
    mealTag: defaultMealTagKey,
    name: 'Nombre de la comida',
  },
  mealDetails: {
    uuid: '',
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
