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
  OtherQuestionaryDetailsCrudRequest,
  DeleteOtherQuestionaryDetailsCrudResponse,
} from 'src/modules/professionals/questionary-config/adapters/out/QuestionaryConfig';
import {
  ENABLE_QUESTIONARY_DETAILS,
  GET_QUESTIONARY,
  OTHER_QUESTIONARY_DETAILS_CRUD,
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
      console.log(response);
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
  const otherQuestionaryDetailsCRUD = async (body: OtherQuestionaryDetailsCrudRequest): Promise<void> => {
    try {
      console.log('---------body', body);
      const response = await apolloClient.mutate<DeleteOtherQuestionaryDetailsCrudResponse, OtherQuestionaryDetailsCrudRequest>({
        mutation: OTHER_QUESTIONARY_DETAILS_CRUD,
        variables: {
          ...body,
        },
      });
      console.log('---------response.data', response.data);
      if (response.data?.addOtherQuestionaryDetails) {
        dispatch(QuestionaryConfigSlice.initializeQuestionaryConfig(response.data.addOtherQuestionaryDetails));
      } else if (response.data?.updateOtherQuestionaryDetails) {
        dispatch(QuestionaryConfigSlice.initializeQuestionaryConfig(response.data.updateOtherQuestionaryDetails));
      } else if (response.data?.deleteOtherQuestionaryDetails) {
        dispatch(QuestionaryConfigSlice.initializeQuestionaryConfig(response.data?.deleteOtherQuestionaryDetails));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { getQuestionary, enableQuestionaryDetails, otherQuestionaryDetailsCRUD };
}
