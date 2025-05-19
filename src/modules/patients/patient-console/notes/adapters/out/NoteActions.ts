import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';

import {
  CreateNoteInput,
  CreateNoteRequest,
  CreateNoteResponse,
  DeleteNoteInput,
  DeleteNoteRequest,
  DeleteNoteResponse,
  GetNotesInput,
  GetNotesRequest,
  GetNotesResponse,
  UpdateNoteInput,
  UpdateNoteRequest,
  UpdateNoteResponse,
} from 'src/modules/patients/patient-console/notes/helpers/notes';
import { CREATE_NOTE, DELETE_NOTE, GET_NOTES, UPDATE_NOTE } from 'src/modules/patients/patient-console/notes/adapters/out/NotesQueries';
import * as NotesSlice from 'src/modules/patients/patient-console/notes/adapters/in/slicers/NotesSlice';

export function useNotes() {
  const dispatch = useDispatch();

  const createNote = async (body: CreateNoteInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<CreateNoteResponse, CreateNoteRequest>({
        mutation: CREATE_NOTE,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response.data) dispatch(NotesSlice.addNewNoteItem(response.data.createNote));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const getNotes = async (body: GetNotesInput) => {
    try {
      const response = await apolloClient.query<GetNotesResponse, GetNotesRequest>({
        query: GET_NOTES,
        variables: {
          input: {
            ...body,
          },
        },
        fetchPolicy: 'network-only',
      });

      if (response.data) {
        dispatch(NotesSlice.initializeNotes(response.data.getNotes.data));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const updateNote = async (body: UpdateNoteInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<UpdateNoteResponse, UpdateNoteRequest>({
        mutation: UPDATE_NOTE,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response.data) {
        dispatch(NotesSlice.updateNoteItem(response.data.updateNote));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const deleteNote = async (body: DeleteNoteInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<DeleteNoteResponse, DeleteNoteRequest>({
        mutation: DELETE_NOTE,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response.data) dispatch(NotesSlice.removeNoteItem(response.data.deleteNote._id));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  return { createNote, getNotes, updateNote, deleteNote };
}
