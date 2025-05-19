import { NotesInitialState } from 'src/modules/patients/patient-console/notes/helpers/notes';

export const notesInitialState: NotesInitialState = {
  notes: { data: [] },
  note: {
    data: {
      _id: '',
      patient: '',
      content: '',
      date: '',
    },
    error: null,
    loading: false,
  },
};
