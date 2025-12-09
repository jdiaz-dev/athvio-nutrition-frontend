import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { formulaInitialState } from 'src/modules/nutrition/formulas/adapters/in/slicers/FormulaInitialState';
import { Formula } from 'src/modules/nutrition/formulas/types/formula';

const formulaSlice = createSlice({
  name: 'formula',
  initialState: formulaInitialState,
  reducers: {
    initializeFormula: (state, action: PayloadAction<Formula>) => {
      state.formula = action.payload;
      return state;
    },
  },
});

export const { initializeFormula } = formulaSlice.actions;

export default formulaSlice.reducer;
