import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import { CREATE_PLAN_MEAL } from 'src/modules/patients/patient-console/patient-plans/adapters/out/PlanMealQueries';
import { PatientPlanBody } from 'src/modules/patients/patient-console/patient-plans/adapters/out/patientPlan.types';
import {
  AddPatientPlanRequest,
  AddPatientPlanResponse,
  CreatePatientPlanMealInput,
} from 'src/modules/patients/patient-console/patient-plans/adapters/out/planMeal.types';
import * as PatientPlanSlice from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/PatientPlanSlice';
import {
  CommentAddedResponse,
  GetChatInput,
  GetChatRequest,
  GetChatResponse,
} from 'src/modules/patients/patient-console/chat/adapters/out/chat';
import { COMMENT_ADDED_SUBSCRIPTION } from 'src/modules/patients/patient-console/chat/adapters/out/ChatQueries';

export function useChat() {
  const dispatch = useDispatch();

  const saveChatComment = async (body: GetChatInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<GetChatResponse, GetChatRequest>({
        mutation: CREATE_PLAN_MEAL,
        variables: {
          chat: {
            ...body,
          },
        },
      });
      if (response) {
        // dispatch(PatientPlanSlice.acceptNewPatientPlan(response.data?.addPlanMeal as PatientPlanBody));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  //todo: fix comment added
  const commentAddedSubscription = async (body: any): Promise<void> => {
    body;
    try {
      const response = apolloClient
        .subscribe<CommentAddedResponse>({
          query: COMMENT_ADDED_SUBSCRIPTION,
          variables: {
            input: { professional: '66493c26091cb4d8d83bedaf', patients: ['66493d52091cb4d8d83bedc4'] },
          },
        })
        .subscribe(({ data, errors, extensions }) => {
          console.log('-------data', data);
          console.log('-------errors', errors);
          console.log('-------extensions', extensions);
        });

      if (response) {
        console.log('-------response', response);
        // dispatch(PatientPlanSlice.acceptNewPatientPlan(response.?.updatePlanMeal as PatientPlanBody));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { saveChatComment, commentAddedSubscription };
}
