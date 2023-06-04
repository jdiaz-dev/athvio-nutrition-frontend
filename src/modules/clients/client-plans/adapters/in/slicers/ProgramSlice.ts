import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mealBasicInfoSlice } from 'src/modules/professionals/programs/adapters/in/slicers/MealBasicInfoSlice';
import { mealDetailsSlice } from 'src/modules/professionals/programs/adapters/in/slicers/MealDetailsSlice';
import { planSlice, plansSlice } from 'src/modules/professionals/programs/adapters/in/slicers/PlanSlice';
import { programInitialState } from 'src/modules/professionals/programs/adapters/in/slicers/ProgramInitialState';
import { ProgramBody, Programs } from 'src/modules/professionals/programs/adapters/out/program.types';

const programsSlice = createSlice({
  name: 'programs',
  initialState: programInitialState.programs,
  reducers: {
    acceptNewPrograms: (state, action: PayloadAction<Programs>) => {
      state = action.payload;
      return state;
    },
  },
});

const programSlice = createSlice({
  name: 'program',
  initialState: programInitialState.program,
  reducers: {
    acceptNewProgram: (state, action: PayloadAction<ProgramBody>) => {
      state = action.payload;
      return state;
    },
    setNameAndDescription: (state, action: PayloadAction<Pick<ProgramBody, 'name' | 'description'>>) => {
      state.name = action.payload.name;
      state.description = action.payload.description;
      return state;
    },
    resetProgramItem: (state) => {
      state = programInitialState.program;
      return state;
    },
  },
});

export const { acceptNewPrograms } = programsSlice.actions;
export const { acceptNewProgram, setNameAndDescription, resetProgramItem } = programSlice.actions;

export default combineReducers({
  programs: programsSlice.reducer,
  program: programSlice.reducer,
  plans: plansSlice.reducer,
  plan: planSlice.reducer,
  mealDetails: mealDetailsSlice.reducer,
  mealBasicInfo: mealBasicInfoSlice.reducer,
});
