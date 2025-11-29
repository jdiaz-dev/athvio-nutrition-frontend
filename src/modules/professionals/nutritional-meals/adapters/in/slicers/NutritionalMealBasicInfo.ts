import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  defaultNutritionalMeal,
  nutritionalMealInitialState,
} from 'src/modules/professionals/nutritional-meals/adapters/in/slicers/NutritionalMealInitialState';
import { MealImageSources } from 'src/shared/Consts';

export const nutritionalMealName = createSlice({
  name: 'nutritionalMealBasicInfo',
  initialState: nutritionalMealInitialState.nutritionalMealBasicInfo,
  reducers: {
    renameNutritionalMeal: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      return state;
    },
    resetName: (state) => {
      state.name = defaultNutritionalMeal;
      return state;
    },
    setImage: (state, action: PayloadAction<{ image?: File | string | null; imageSource?: MealImageSources }>) => {
      const { image, imageSource } = action.payload;
      if (image !== undefined) {
        state.image = image;
      }
      if (imageSource) {
        state.imageSource = imageSource;
      }
      return state;
    },
  },
});

export const { renameNutritionalMeal, resetName, setImage } = nutritionalMealName.actions;
