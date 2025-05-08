export type NoteBody = {
  _id: string;
  professional: string;
  patient: string;
  content: string;
  createdAt: string;
};

export type CreateNoteInput = Omit<NoteBody, '_id' | 'createdAt'> & {};

export type CreateNoteRequest = {
  input: CreateNoteInput;
};

export type CreateNoteResponse = {
  createNote: NoteBody;
};

export type GetNotesInput = Omit<NoteBody, 'professional' | 'patient'> & {};
export type GetNotesRequest = {
  input: GetNotesInput;
};

export type Notes = {
  data: NoteBody[];
  meta: {
    total: number;
    offset: number;
    limit: number;
  };
};
export type GetNotesResponse = {
  getNotes: Notes;
};

export type UpdateNoteInput = CreateNoteInput & {
  note: string;
};

export type UpdateNoteRequest = {
  input: UpdateNoteInput;
};

export type UpdateNoteResponse = {
  updateNote: NoteBody;
};

export type DeleteNoteInput = UpdateNoteInput;

export type DeleteNoteRequest = {
  input: DeleteNoteInput;
};

export type DeleteNoteResponse = {
  deleteNote: NoteBody;
};

export type NotesInitialState = {
  notes: { data: NoteBody[] };
};
