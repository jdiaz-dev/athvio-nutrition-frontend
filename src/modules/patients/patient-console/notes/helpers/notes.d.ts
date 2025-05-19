export type NoteBody = {
  _id: string;
  professional: string;
  patient: string;
  content: string;
  date: string;
};

export type CreateNoteInput = Omit<NoteBody, '_id'> & {};

export type CreateNoteRequest = {
  input: CreateNoteInput;
};

export type CreateNoteResponse = {
  createNote: NoteBody;
};

export type GetNotesInput = Pick<NoteBody, 'professional' | 'patient'> & {};
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

export type UpdateNoteInput = Omit<CreateNoteInput, 'date'> & {
  note: string;
};

export type UpdateNoteRequest = {
  input: UpdateNoteInput;
};

export type UpdateNoteResponse = {
  updateNote: NoteBody;
};

export type DeleteNoteInput = Omit<UpdateNoteInput, 'content'>;

export type DeleteNoteRequest = {
  input: DeleteNoteInput;
};

export type DeleteNoteResponse = {
  deleteNote: NoteBody;
};

export type NotesInitialState = {
  notes: { data: NoteBody[] };
  note: { data: Omit<NoteBody, 'professional'>; error: string | null; loading: boolean };
};
