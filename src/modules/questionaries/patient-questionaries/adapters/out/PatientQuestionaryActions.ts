import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import {
  GET_PATIENT_QUESTIONARY,
  SEND_PATIENT_QUESTIONARY,
  UPDATE_ANSWER_AND_ADDITIONAL_NOTES,
} from 'src/modules/questionaries/patient-questionaries/adapters/out/PatientQuestionaryQueries';
import * as PatientQuestionarySlice from 'src/modules/questionaries/patient-questionaries/adapters/in/slicers/PatientQuestionarySlice';

import {
  GetPatientQuestionaryBody,
  GetPatientQuestionaryRequest,
  GetPatientQuestionaryResponse,
  SendPatientQuestionaryBody,
  SendPatientQuestionaryRequest,
  SendPatientQuestionaryResponse,
  UpdateAnswerAndAdditionalNotesInput,
  UpdateAnswerAndAdditionalNotesRequest,
  UpdateAnswerAndAdditionalNotesResponse,
} from 'src/modules/questionaries/patient-questionaries/adapters/out/PatientQuestionary';

export function usePatientQuestionary() {
  const dispatch = useDispatch();

  const getPatientQuestionary = async (body: GetPatientQuestionaryBody): Promise<void> => {
    try {
      const response = await apolloClient.query<GetPatientQuestionaryResponse, GetPatientQuestionaryRequest>({
        query: GET_PATIENT_QUESTIONARY,
        variables: {
          input: {
            ...body,
          },
        },
        fetchPolicy: 'network-only',
      });
      if (response.data) {
        dispatch(PatientQuestionarySlice.initializePatientQuestionaryGroups(response.data.getPatientQuestionary));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const updateAnswerAndAdditionalNotes = async (body: UpdateAnswerAndAdditionalNotesInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<UpdateAnswerAndAdditionalNotesResponse, UpdateAnswerAndAdditionalNotesRequest>({
        mutation: UPDATE_ANSWER_AND_ADDITIONAL_NOTES,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response.data) {
        dispatch(PatientQuestionarySlice.initializePatientQuestionaryGroups(response.data.updateAnswerAndAdditionalNotes));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const sendPatientQuestionary = async (body: SendPatientQuestionaryBody) => {
    try {
      const response = await apolloClient.mutate<SendPatientQuestionaryResponse, SendPatientQuestionaryRequest>({
        mutation: SEND_PATIENT_QUESTIONARY,
        variables: {
          input: {
            ...body,
          },
        },
      });
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { getPatientQuestionary, updateAnswerAndAdditionalNotes, sendPatientQuestionary };
}
