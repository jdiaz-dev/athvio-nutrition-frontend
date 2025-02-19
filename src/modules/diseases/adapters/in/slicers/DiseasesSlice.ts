import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { diseaseInitialState } from 'src/modules/diseases/adapters/in/slicers/DiseaseInitialState';
import { Diseases } from 'src/modules/diseases/adapters/out/disease';

const diseasesSlice = createSlice({
  name: 'diseases',
  initialState: diseaseInitialState.diseases,
  reducers: {
    acceptNewDiseases: (state, action: PayloadAction<Diseases>) => {
      state = action.payload;
      return state;
    },
  },
});
export const { acceptNewDiseases } = diseasesSlice.actions;

export default combineReducers({
  diseases: diseasesSlice.reducer,
});
