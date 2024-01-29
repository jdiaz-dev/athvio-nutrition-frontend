import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dayjs } from 'dayjs';
import { assignProgramInitialState } from 'src/modules/professionals/assign-program/in/slicers/AssignProgramInitialState';
import { PatientToAssign } from 'src/modules/professionals/assign-program/out/AssignProgram.types';

export const assignProgramSlice = createSlice({
  name: 'assignProgram',
  initialState: assignProgramInitialState,
  reducers: {
    assignNewPatient: (state, action: PayloadAction<PatientToAssign>) => {
      const patientFound = state.patients.find((patient) => patient._id === action.payload._id);
      if (!patientFound) state.patients.push(action.payload);
      return state;
    },
    unassignPatient: (state, action: PayloadAction<PatientToAssign>) => {
      const filteredPatients = state.patients.filter((patient) => patient._id !== action.payload._id);
      state.patients = filteredPatients;
      return state;
    },
    assignStartDate: (state, action: PayloadAction<Dayjs>) => {
      state.assignmentStartDate = action.payload;
      return state;
    },
    assignStartingDay: (state, action: PayloadAction<number>) => {
      state.startingDay = action.payload;
      return state;
    },
    resetAssignmets: (state) => {
      state = assignProgramInitialState;
      return state;
    },
  },
});

export const { assignNewPatient, unassignPatient, assignStartDate, assignStartingDay, resetAssignmets } = assignProgramSlice.actions;
export default assignProgramSlice.reducer;
