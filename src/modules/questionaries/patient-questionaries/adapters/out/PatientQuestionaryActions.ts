import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import {
  GET_PATIENT_QUESTIONARY,
  SEND_PATIENT_QUESTIONARY,
  UPDATE_ANSWERS,
  UPDATE_ANSWERS_AND_ADDITIONAL_NOTES,
} from 'src/modules/questionaries/patient-questionaries/adapters/out/PatientQuestionaryQueries';
import * as PatientQuestionarySlice from 'src/modules/questionaries/patient-questionaries/adapters/in/slicers/PatientQuestionarySlice';

import {
  GetPatientQuestionaryBody,
  GetPatientQuestionaryRequest,
  GetPatientQuestionaryResponse,
  SendPatientQuestionaryBody,
  SendPatientQuestionaryRequest,
  SendPatientQuestionaryResponse,
  UpdateAnswersAndAdditionalNotesInput,
  UpdateAnswersAndAdditionalNotesRequest,
  UpdateAnswersAndAdditionalNotesResponse,
  UpdateAnswersInput,
  UpdatePatientQuestionaryAnswersRequest,
  UpdatePatientQuestionaryAnswersResponse,
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

  const updatePatientQuestionaryAnswers = async (body: UpdateAnswersInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<UpdatePatientQuestionaryAnswersResponse, UpdatePatientQuestionaryAnswersRequest>({
        mutation: UPDATE_ANSWERS,
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

  const updateAnswersAndAdditionalNotes = async (body: UpdateAnswersAndAdditionalNotesInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<UpdateAnswersAndAdditionalNotesResponse, UpdateAnswersAndAdditionalNotesRequest>({
        mutation: UPDATE_ANSWERS_AND_ADDITIONAL_NOTES,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response.data) {
        dispatch(PatientQuestionarySlice.initializePatientQuestionaryGroups(response.data.updateAnswersAndAdditionalNotes));
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

  return { getPatientQuestionary, updatePatientQuestionaryAnswers, updateAnswersAndAdditionalNotes, sendPatientQuestionary };
}
