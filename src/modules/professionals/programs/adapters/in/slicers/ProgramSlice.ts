import { combineReducers, createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { programPlanMealBasicInfoSlice } from 'src/modules/professionals/programs/adapters/in/slicers/MealBasicInfoSlice';
import { programPlanMealDetailsSlice } from 'src/modules/professionals/programs/adapters/in/slicers/MealDetailsSlice';
import { mealListSlice } from 'src/modules/professionals/programs/adapters/in/slicers/MealsListSlice';
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
    acceptCreatedProgram: (state, action: PayloadAction<ProgramBody>) => {
      if (state) state.data.push(action.payload);
      return state;
    },
    acceptUpdatedProgram: (state, action: PayloadAction<ProgramBody>) => {
      if (state) {
        const indexFound = state.data.findIndex((item) => item.uuid === action.payload.uuid);
        state.data[indexFound] = action.payload;
      }
      return state;
    },
  },
});
export const { acceptNewPrograms, acceptCreatedProgram, acceptUpdatedProgram } = programsSlice.actions;

export const programError = createAction<string>('programError');
export const programErrorCleaner = createAction('programErrorCleaner');

const programSlice = createSlice({
  name: 'program',
  initialState: programInitialState.program,
  reducers: {
    acceptNewProgram: (state, action: PayloadAction<ProgramBody>) => {
      state.data = action.payload;
      return state;
    },
    setNameAndDescription: (state, action: PayloadAction<Pick<ProgramBody, 'name' | 'description'>>) => {
      state.data.name = action.payload.name;
      state.data.description = action.payload.description;
      return state;
    },
    resetProgramItem: (state) => {
      state = programInitialState.program;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(programError, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      return state;
    });
    builder.addCase(programErrorCleaner, (state) => {
      state.loading = false;
      state.error = null;
      return state;
    });
  },
});

export const { acceptNewProgram, setNameAndDescription, resetProgramItem } = programSlice.actions;

export default combineReducers({
  programs: programsSlice.reducer,
  program: programSlice.reducer,
  plans: plansSlice.reducer,
  plan: planSlice.reducer,
  mealList: mealListSlice.reducer,
  mealDetails: programPlanMealDetailsSlice.reducer,
  mealBasicInfo: programPlanMealBasicInfoSlice.reducer,
});
