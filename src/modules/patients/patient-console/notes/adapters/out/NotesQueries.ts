import { gql } from '@apollo/client';

export const CREATE_NOTE = gql`
  mutation _createNote($input: CreateNoteDto!) {
    createNote(input: $input) {
      _id
      content
      date
    }
  }
`;

export const GET_NOTES = gql`
  query _getNotes($input: GetNotesDto!) {
    getNotes(input: $input) {
      data {
        _id
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
      _id
      content
      date
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation _deleteNote($input: DeleteNoteDto!) {
    deleteNote(input: $input) {
      _id
      content
      date
    }
  }
`;
