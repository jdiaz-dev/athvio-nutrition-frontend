import { combineReducers, createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    addNewNoteItem: (state, action: PayloadAction<NoteBody>) => {
      state.data.push(action.payload);
      return state;
    },
    updateNoteItem: (state, action: PayloadAction<NoteBody>) => {
      const noteIndex = state.data.findIndex((item) => item._id === action.payload._id);
      if (noteIndex !== -1) state.data[noteIndex] = action.payload;
      return state;
    },
    removeNoteItem: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item._id !== action.payload);
      return state;
    },
  },
});

export const { initializeNotes, addNewNoteItem, updateNoteItem, removeNoteItem } = notesSlice.actions;

export const noteError = createAction<string>('noteError');
export const noteErrorCleaner = createAction('noteErrorCleaner');

const noteSlice = createSlice({
  name: 'note',
  initialState: notesInitialState.note,
  reducers: {
    acceptNewNote: (state, action: PayloadAction<NoteBody>) => {
      state.data = action.payload;
      return state;
    },
    modifyNote: (state, action: PayloadAction<Pick<NoteBody, 'content' | 'date'>>) => {
      state.data.content = action.payload.content;
      state.data.date = action.payload.date;
      return state;
    },
    resetNote: (state) => {
      state = notesInitialState.note;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(noteError, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      return state;
    });
    builder.addCase(noteErrorCleaner, (state) => {
      state.loading = false;
      state.error = null;
      return state;
    });
  },
});

export const { acceptNewNote, modifyNote, resetNote } = noteSlice.actions;

export default combineReducers({
  notes: notesSlice.reducer,
  note: noteSlice.reducer,
});
