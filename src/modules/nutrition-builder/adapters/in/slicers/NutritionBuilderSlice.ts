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
    updateDiseaseCause(state, action: PayloadAction<{ _id: string; status: NutriBuilderParamStatus }>) {
      const index = state.diseaseCauses.findIndex((item) => item._id === action.payload._id);
      if (index !== -1) state.diseaseCauses[index].status = action.payload.status;
      return state;
    },
    updateNutritionalPreference(state, action: PayloadAction<{ _id: string; status: NutriBuilderParamStatus }>) {
      const index = state.nutritionalPreferences.findIndex((item) => item._id === action.payload._id);
      if (index !== -1) state.nutritionalPreferences[index].status = action.payload.status;
      return state;
    },
    updateDisease(state, action: PayloadAction<{ _id: string; status: NutriBuilderParamStatus }>) {
      const index = state.diseases.findIndex((item) => item._id === action.payload._id);
      if (index !== -1) state.diseases[index].status = action.payload.status;
      return state;
    },
  },
});
export const { initializeParameters, updateDiseaseCause, updateNutritionalPreference, updateDisease } = nutritionBuilderSlice.actions;

export default nutritionBuilderSlice.reducer;
