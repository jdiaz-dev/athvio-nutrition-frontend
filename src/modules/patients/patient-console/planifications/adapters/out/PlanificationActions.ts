import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import {
  CreatePlanificationInput,
  CreatePlanificationRequest,
  CreatePlanificationResponse,
  GetPlanificationsInput,
  GetPlanificationsRequest,
  GetPlanificationsResponse,
  UpdatePlanificationInput,
  UpdatePlanificationRequest,
  UpdatePlanificationResponse,
} from 'src/modules/patients/patient-console/planifications/helpers/planifications';
import * as PlanificationSlice from 'src/modules/patients/patient-console/planifications/adapters/in/slicers/PlanificationSlice';

import {
  CREATE_PLANIFICATION,
  GET_PLANIFICATIONS,
  UPDATE_PLANIFICATION,
} from 'src/modules/patients/patient-console/planifications/adapters/out/PlanificationQueries';

export function usePlanification() {
  const dispatch = useDispatch();

  const createPlanification = async (body: CreatePlanificationInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<CreatePlanificationResponse, CreatePlanificationRequest>({
        mutation: CREATE_PLANIFICATION,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response.data) {
        dispatch(PlanificationSlice.acceptNewPlanification(response.data.createPlanification));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const getPlanifications = async (body: GetPlanificationsInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<GetPlanificationsResponse, GetPlanificationsRequest>({
        mutation: GET_PLANIFICATIONS,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response.data) {
        dispatch(PlanificationSlice.initializePlanifications(response.data.getPlanifications));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const updatePlanification = async (body: UpdatePlanificationInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<UpdatePlanificationResponse, UpdatePlanificationRequest>({
        mutation: UPDATE_PLANIFICATION,
        variables: {
          input: {
            ...body,
          },
        },
      });

      if (response.data) {
        dispatch(PlanificationSlice.modifyPlanification(response.data.updatePlanification));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { createPlanification, updatePlanification, getPlanifications };
}
