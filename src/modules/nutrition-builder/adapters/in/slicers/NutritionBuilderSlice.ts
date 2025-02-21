import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nutritionBuilderInitialState } from 'src/modules/nutrition-builder/adapters/in/slicers/NutritionBuilderInitialState';
import { GetNutritionBuilderParametersResponse } from 'src/modules/nutrition-builder/adapters/out/nutritionBuilder';
import { ParametersStatus } from 'src/modules/nutrition-builder/helpers/enums';

const nutritionBuilderSlice = createSlice({
  name: 'nutritionBuilder',
  initialState: nutritionBuilderInitialState,
  reducers: {
    initializeParameters: (state, action: PayloadAction<GetNutritionBuilderParametersResponse>) => {
      state.diseaseCauses = action.payload.getDiseaseCauses.map((item) => ({ ...item, status: ParametersStatus.INITIALIZED }));
      state.nutritionalPreferences = action.payload.getNutritionalPreferences.map((item) => ({
        ...item,
        status: ParametersStatus.INITIALIZED,
      }));
      state.diseases = action.payload.getDiseases.map((item) => ({ ...item, status: ParametersStatus.INITIALIZED }));
      return state;
    },
  },
});
export const { initializeParameters } = nutritionBuilderSlice.actions;

export default nutritionBuilderSlice.reducer;
