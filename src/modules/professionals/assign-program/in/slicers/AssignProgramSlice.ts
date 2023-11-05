import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dayjs } from 'dayjs';
import { assignProgramInitialState } from 'src/modules/professionals/assign-program/in/slicers/AssignProgramInitialState';
import { ClientToAssign } from 'src/modules/professionals/assign-program/out/AssignProgram.types';

export const assignProgramSlice = createSlice({
  name: 'assignProgram',
  initialState: assignProgramInitialState,
  reducers: {
    assignNewClient: (state, action: PayloadAction<ClientToAssign>) => {
      state.clients.push(action.payload);
      return state;
    },
    unassignClient: (state, action: PayloadAction<ClientToAssign>) => {
      const filteredClients = state.clients.filter((client) => client._id !== action.payload._id);
      state.clients = filteredClients;
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
  },
});

export const { assignNewClient, unassignClient, assignStartDate, assignStartingDay } = assignProgramSlice.actions;
export default assignProgramSlice.reducer;
