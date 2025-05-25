import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import { GET_PATIENT_QUESTIONARY } from 'src/modules/questionaries/patient-questionaries/adapters/out/PatientQuestionaryQueries';
import * as PatientQuestionarySlice from 'src/modules/questionaries/patient-questionaries/adapters/in/slicers/PatientQuestionarySlice';

import {
  GetPatientQuestionaryBody,
  GetPatientQuestionaryRequest,
  GetPatientQuestionaryResponse,
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
      });
      if (response.data) {
        dispatch(PatientQuestionarySlice.initializePatientQuestionaryGroups(response.data.getPatientQuestionary.questionaryGroups));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { getPatientQuestionary };
}
