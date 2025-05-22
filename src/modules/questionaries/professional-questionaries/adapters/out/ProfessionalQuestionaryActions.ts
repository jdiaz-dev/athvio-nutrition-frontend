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

export function useProfessionalQuestionary() {
  const dispatch = useDispatch();

  const getQuestionary = async (body: GetProfessionalQuestionaryBody): Promise<void> => {
    try {
      const response = await apolloClient.query<GetProfessionalQuestionaryResponse, GetProfessionalQuestionaryRequest>({
        query: GET_QUESTIONARY,
        variables: {
          input: {
            ...body,
          },
        },
      });
      dispatch(ProfessionalQuestionarySlice.initializeProfessionalQuestionary(response.data.getProfessionalQuestionary));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const enableQuestionaryDetails = async (body: EnableQuestionaryDetailsBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<EnableQuestionaryDetailResponse, EnableQuestionaryDetailRequest>({
        mutation: ENABLE_QUESTIONARY_DETAILS,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response.data) {
        dispatch(ProfessionalQuestionarySlice.initializeProfessionalQuestionary(response.data.enableQuestionaryDetails));

        //toodo: remove this comment
        dispatch(ProfessionalQuestionarySlice.resetIsEnabledQuestionaryDetails());
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const customQuestionaryDetailsCRUD = async (body: CustomQuestionaryDetailsCrudRequest): Promise<void> => {
    try {
      const response = await apolloClient.mutate<CustomQuestionaryDetailsCrudResponse, CustomQuestionaryDetailsCrudRequest>({
        mutation: CUSTOM_QUESTIONARY_DETAILS_CRUD,
        variables: {
          ...body,
        },
      });
      if (response.data?.deleteCustomQuestionaryDetails) {
        dispatch(ProfessionalQuestionarySlice.initializeProfessionalQuestionary(response.data.deleteCustomQuestionaryDetails));
      } else if (response.data?.updateCustomQuestionaryDetails) {
        dispatch(ProfessionalQuestionarySlice.initializeProfessionalQuestionary(response.data.updateCustomQuestionaryDetails));
      } else if (response.data?.addCustomQuestionaryDetails) {
        dispatch(ProfessionalQuestionarySlice.initializeProfessionalQuestionary(response.data.addCustomQuestionaryDetails));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { getQuestionary, enableQuestionaryDetails, customQuestionaryDetailsCRUD };
}
