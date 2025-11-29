import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MealBasicInfo } from 'src/shared/components/PlanDetailDialog/Meal.types';
import { MealImageSources } from 'src/shared/Consts';

export const mealBasicInfoSlice = (sliceName: string, initialState: MealBasicInfo) => {
  return createSlice({
    name: sliceName,
    initialState: initialState,
    reducers: {
      acceptNewMealBasicInfo: (state, action: PayloadAction<MealBasicInfo>) => {
        state.mealTag = action.payload.mealTag;
        state.name = action.payload.name;
        state.position = action.payload.position;
        if (action.payload.image !== null) state.image = action.payload.image;
        if (action.payload.imageSource) state.imageSource = action.payload.imageSource;
        return state;
      },
      renameMealTag: (state, action: PayloadAction<string>) => {
        state.mealTag = action.payload;
        return state;
      },
      changeName: (state, action: PayloadAction<string>) => {
        state.name = action.payload;
        return state;
      },
      setImage: (state, action: PayloadAction<{ image?: File | null; imageSource?: MealImageSources }>) => {
        const { image, imageSource } = action.payload;
        if (image && image !== null) {
          state.image = image;
        }
        if (imageSource) {
          state.imageSource = imageSource;
        }
        return state;
      },
    },
  });
};
