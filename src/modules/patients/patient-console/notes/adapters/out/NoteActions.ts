import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import * as PatientPlanSlice from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/PatientPlanSlice';

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
      if (response.data) dispatch(PatientPlanSlice.addNewPatientPlan(response.data.createNote));
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
          patientPlans: {
            ...body,
          },
        },
        fetchPolicy: 'network-only',
      });

      if (response.data) {
        dispatch(PatientPlanSlice.acceptNewPatientPlans(response.data.getPatientPlansForWeb));
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
        dispatch(PatientPlanSlice.modififyingSpecificPatientPlan(response.data?.updateNote));
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
      response;
      // dispatch(PatientPlanSlice.acceptNewPlans(response.data?.deleteMeal.plans as unknown as Plan[]));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  return { createNote, getNotes, updateNote, deleteNote };
}
