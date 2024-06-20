import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { professionalInitialState } from 'src/modules/professionals/professional/adapters/in/slicers/ProfessionalInitialState';
import { ProfessionalInitialState } from 'src/modules/professionals/professional/adapters/out/professional';

export const professionalSlice = createSlice({
  name: 'professional',
  initialState: professionalInitialState,
  reducers: {
    acceptNewProfessional: (state, action: PayloadAction<ProfessionalInitialState>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { acceptNewProfessional } = professionalSlice.actions;
export default professionalSlice.reducer;
