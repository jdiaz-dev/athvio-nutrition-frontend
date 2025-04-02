import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import * as QuestionaryConfigSlice from 'src/modules/professionals/questionary-config/adapters/in/slicers/QuestionaryConfigSlice';
import {
  EnableQuestionaryDetailsBody,
  EnableQuestionaryDetailRequest,
  EnableQuestionaryDetailResponse,
  GetQuestionaryConfigBody,
  GetQuestionaryConfigRequest,
  GetQuestionaryConfigResponse,
  CustomQuestionaryDetailsCrudRequest,
  CustomQuestionaryDetailsCrudResponse,
} from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfig';
import {
  ENABLE_QUESTIONARY_DETAILS,
  GET_QUESTIONARY,
  CUSTOM_QUESTIONARY_DETAILS_CRUD,
} from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfigQueries';

export function useQuestionaryConfig() {
  const dispatch = useDispatch();

  const getQuestionary = async (body: GetQuestionaryConfigBody): Promise<void> => {
    try {
      const response = await apolloClient.query<GetQuestionaryConfigResponse, GetQuestionaryConfigRequest>({
        query: GET_QUESTIONARY,
        variables: {
          input: {
            ...body,
          },
        },
      });
      dispatch(QuestionaryConfigSlice.initializeQuestionaryConfig(response.data.getQuestionary));
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
        dispatch(QuestionaryConfigSlice.initializeQuestionaryConfig(response.data.enableQuestionaryDetails));

        //toodo: remove this comment
        dispatch(QuestionaryConfigSlice.resetIsEnabledQuestionaryDetails());
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
        dispatch(QuestionaryConfigSlice.initializeQuestionaryConfig(response.data.deleteCustomQuestionaryDetails));
      } else if (response.data?.updateCustomQuestionaryDetails) {
        dispatch(QuestionaryConfigSlice.initializeQuestionaryConfig(response.data.updateCustomQuestionaryDetails));
      } else if (response.data?.addCustomQuestionaryDetails) {
        dispatch(QuestionaryConfigSlice.initializeQuestionaryConfig(response.data.addCustomQuestionaryDetails));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { getQuestionary, enableQuestionaryDetails, customQuestionaryDetailsCRUD };
}
