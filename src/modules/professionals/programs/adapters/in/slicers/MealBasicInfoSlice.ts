import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { programInitialState } from 'src/modules/professionals/programs/adapters/in/slicers/ProgramInitialState';
import { MealBasicInfo } from 'src/modules/professionals/programs/adapters/out/program.types';

export const mealBasicInfoSlice = createSlice({
  name: 'mealBasicInfo',
  initialState: programInitialState.mealBasicInfo,
  reducers: {
    acceptNewMealBasicInfo: (state, action: PayloadAction<MealBasicInfo>) => {
      state = action.payload;
      return state;
    },
    renameMealTag: (state, action: PayloadAction<string>) => {
      state.mealTag = action.payload;
      console.log('--------------action.payload', action.payload);
      return state;
    },
  },
});

export const { acceptNewMealBasicInfo, renameMealTag } = mealBasicInfoSlice.actions;
