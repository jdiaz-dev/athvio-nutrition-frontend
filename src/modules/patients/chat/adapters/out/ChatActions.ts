import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import { CREATE_PLAN_MEAL, DELETE_PLAN_MEAL, UPDATE_PLAN_MEAL } from 'src/modules/patients/patient-plans/adapters/out/PlanMealQueries';
import { PatientPlanBody } from 'src/modules/patients/patient-plans/adapters/out/patientPlan.types';
import {
  AddPatientPlanRequest,
  AddPatientPlanResponse,
  CreatePatientPlanMealInput,
  DeletePlanMealInput,
  DeletePlanMealRequest,
  DeletePlanMealResponse,
  UpdatePatientPlanMealInput,
  UpdatePlanMealRequest,
  UpdatePlanMealResponse,
} from 'src/modules/patients/patient-plans/adapters/out/planMeal.types';
import * as PatientPlanSlice from 'src/modules/patients/patient-plans/adapters/in/slicers/PatientPlanSlice';
import { CommentAddedResponse } from 'src/modules/patients/chat/adapters/out/chat.types';
import { COMMENT_ADDED_SUBSCRIPTION } from 'src/modules/patients/chat/adapters/out/ChatQueries';

export function useChat() {
  const dispatch = useDispatch();
  const saveChatComment = async (body: CreatePatientPlanMealInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<AddPatientPlanResponse, AddPatientPlanRequest>({
        mutation: CREATE_PLAN_MEAL,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response) {
        dispatch(PatientPlanSlice.acceptNewPatientPlan(response.data?.addPlanMeal as PatientPlanBody));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const commentAddedSubscription = async (body: any): Promise<void> => {
    try {
      const response = apolloClient.subscribe<CommentAddedResponse>({
        query: COMMENT_ADDED_SUBSCRIPTION,
        /* variables: {
          input: {
            ...body,
          },
        }, */

      }).subscribe(({data, errors, extensions}) => {
        console.log('-------data', data)
        console.log('-------errors', errors)
        console.log('-------extensions', extensions)

      })

      if (response) {
        console.log('-------response', response)
        // dispatch(PatientPlanSlice.acceptNewPatientPlan(response.?.updatePlanMeal as PatientPlanBody));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { saveChatComment, commentAddedSubscription };
}
