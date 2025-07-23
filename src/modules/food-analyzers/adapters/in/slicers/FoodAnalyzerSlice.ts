import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { foodAnalyzerInitialState } from 'src/modules/food-analyzers/adapters/in/slicers/FoodAnalyzerInitialState';
import { FoodAnalyzer } from 'src/modules/food-analyzers/adapters/out/FoodAnalyzer';

const foodAnalyzersSlices = createSlice({
  name: 'foodAnalyzers',
  initialState: foodAnalyzerInitialState.foodAnalyzers,
  reducers: {
    initializeFoodAnalizers: (state, action: PayloadAction<FoodAnalyzer[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { initializeFoodAnalizers } = foodAnalyzersSlices.actions;

export default combineReducers({
  foodAnalyzers: foodAnalyzersSlices.reducer,
});
