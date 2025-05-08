import { combineReducers, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notesInitialState } from 'src/modules/patients/patient-console/notes/adapters/in/slicers/NotesInitialState';
import { NoteBody } from 'src/modules/patients/patient-console/notes/helpers/notes';

const notesSlice = createSlice({
  name: 'notes',
  initialState: notesInitialState.notes,
  reducers: {
    initializeNotes: (state, action: PayloadAction<NoteBody[]>) => {
      state.data = action.payload;
      return state;
    },
    /* resetPatientPlans: (state) => {
      state = patientPlanInitialState.patientPlans;
      return state;
    }, */
    addNewNote: (state, action: PayloadAction<NoteBody>) => {
      state.data.push(action.payload);
      return state;
    },
    updateNote: (state, action: PayloadAction<NoteBody>) => {
      const noteIndex = state.data.findIndex((item) => item._id === action.payload._id);
      if (noteIndex !== -1) state.data[noteIndex] = action.payload;
      return state;
    },
  },
});

export const { initializeNotes, addNewNote, updateNote } = notesSlice.actions;

export default combineReducers({
  notes: notesSlice.reducer,
});
