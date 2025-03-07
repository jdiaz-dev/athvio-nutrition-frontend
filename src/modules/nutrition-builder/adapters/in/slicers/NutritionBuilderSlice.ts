import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nutritionBuilderInitialState } from 'src/modules/nutrition-builder/adapters/in/slicers/NutritionBuilderInitialState';
import { GetProgramBuilderParametersResponse } from 'src/modules/nutrition-builder/adapters/out/nutritionBuilder';
import { NutriBuilderParamStatus } from 'src/shared/Consts';

const nutritionBuilderSlice = createSlice({
  name: 'nutritionBuilder',
  initialState: nutritionBuilderInitialState,
  reducers: {
    initializeParameters: (state, action: PayloadAction<GetProgramBuilderParametersResponse>) => {
      state.diseaseCauses = action.payload.getAllDiseaseCauses.map((item) => ({ ...item, status: NutriBuilderParamStatus.INITIALIZED }));
      state.nutritionalPreferences = action.payload.getAllNutritionalPreferences.map((item) => ({
        ...item,
        status: NutriBuilderParamStatus.INITIALIZED,
      }));
      state.diseases = action.payload.getAllDiseases.map((item) => ({ ...item, status: NutriBuilderParamStatus.INITIALIZED }));
      return state;
    },
    updateDiseaseCause(state, action: PayloadAction<{ id: string; status: NutriBuilderParamStatus }>) {
      const index = state.diseaseCauses.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) state.diseaseCauses[index].status = action.payload.status;
      return state;
    },
    updateNutritionalPreference(state, action: PayloadAction<{ id: string; status: NutriBuilderParamStatus }>) {
      const index = state.nutritionalPreferences.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) state.nutritionalPreferences[index].status = action.payload.status;
      return state;
    },
    updateDisease(state, action: PayloadAction<{ id: string; status: NutriBuilderParamStatus }>) {
      const index = state.diseases.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) state.diseases[index].status = action.payload.status;
      return state;
    },
    updateTotalDays(state, action: PayloadAction<number>) {
      state.totalDays = action.payload;
      return state;
    },
    updateMealsByDay(state, action: PayloadAction<number>) {
      state.mealsByDay = action.payload;
      return state;
    },
    updateCarbs(state, action: PayloadAction<number>) {
      state.macros.carbs = action.payload;
      return state;
    },
    updateProtein(state, action: PayloadAction<number>) {
      state.macros.protein = action.payload;
      return state;
    },
    updateFat(state, action: PayloadAction<number>) {
      state.macros.fat = action.payload;
      return state;
    },
    updateCalories(state, action: PayloadAction<number>) {
      state.macros.calories = action.payload;
      return state;
    },
  },
});
export const {
  initializeParameters,
  updateDiseaseCause,
  updateNutritionalPreference,
  updateDisease,
  updateTotalDays,
  updateMealsByDay,
  updateCarbs,
  updateProtein,
  updateFat,
  updateCalories,
} = nutritionBuilderSlice.actions;

export default nutritionBuilderSlice.reducer;
