import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import * as ProfessionalQuestionarySlice from 'src/modules/questionaries/professional-questionaries/adapters/in/slicers/ProfessionalQuestionarySlice';
import {
  EnableQuestionaryDetailsBody,
  EnableQuestionaryDetailRequest,
  EnableQuestionaryDetailResponse,
  GetProfessionalQuestionaryBody,
  GetProfessionalQuestionaryRequest,
  GetProfessionalQuestionaryResponse,
  CustomQuestionaryDetailsCrudRequest,
  CustomQuestionaryDetailsCrudResponse,
} from 'src/modules/questionaries/professional-questionaries/adapters/out/ProfessionalQuestionary';
import {
  ENABLE_QUESTIONARY_DETAILS,
  GET_QUESTIONARY,
  CUSTOM_QUESTIONARY_DETAILS_CRUD,
} from 'src/modules/questionaries/professional-questionaries/adapters/out/ProfessionalQuestionaryQueries';

export function usePatientQuestionary() {
  const dispatch = useDispatch();

  const getPatientQuestionary = async (body: GetProfessionalQuestionaryBody): Promise<void> => {
    try {
      const response = await apolloClient.query<GetProfessionalQuestionaryResponse, GetProfessionalQuestionaryRequest>({
        query: GET_QUESTIONARY,
        variables: {
          input: {
            ...body,
          },
        },
      });
      dispatch(ProfessionalQuestionarySlice.initializeProfessionalQuestionary(response.data.getPatientQuestionary));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { getPatientQuestionary };
}
