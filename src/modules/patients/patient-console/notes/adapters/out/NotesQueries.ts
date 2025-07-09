import { gql } from '@apollo/client';

export const CREATE_NOTE = gql`
  mutation _createNote($input: CreateNoteDto!) {
    createNote(input: $input) {
      uuid
      content
      date
    }
  }
`;

export const GET_NOTES = gql`
  query _getNotes($input: GetNotesDto!) {
    getNotes(input: $input) {
      data {
        uuid
        content
        date
      }
      meta {
        total
      }
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation _updateNote($input: UpdateNoteDto!) {
    updateNote(input: $input) {
      uuid
      content
      date
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation _deleteNote($input: DeleteNoteDto!) {
    deleteNote(input: $input) {
      uuid
      content
      date
    }
  }
`;
