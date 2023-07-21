import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import { CREATE_PLAN_MEAL, DELETE_PLAN_MEAL, UPDATE_PLAN_MEAL } from 'src/modules/clients/client-plans/adapters/out/PlanMealQueries';
import { ClientPlanBody } from 'src/modules/clients/client-plans/adapters/out/clientPlan.types';
import {
  AddClientPlanRequest,
  AddClientPlanResponse,
  CreateClientPlanMealInput,
  DeletePlanMealInput,
  DeletePlanMealRequest,
  DeletePlanMealResponse,
  UpdateClientPlanMealInput,
  UpdatePlanMealRequest,
  UpdatePlanMealResponse,
} from 'src/modules/clients/client-plans/adapters/out/planMeal.types';
import * as ClientPlanSlice from 'src/modules/clients/client-plans/adapters/in/slicers/ClientPlanSlice';

export function useClientPlanMeal() {
  const dispatch = useDispatch();
  const createClientPlanMeal = async (body: CreateClientPlanMealInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<AddClientPlanResponse, AddClientPlanRequest>({
        mutation: CREATE_PLAN_MEAL,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response) {
        dispatch(ClientPlanSlice.acceptNewClientPlan(response.data?.addPlanMeal as ClientPlanBody));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const updateClientPlanMeal = async (body: UpdateClientPlanMealInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<UpdatePlanMealResponse, UpdatePlanMealRequest>({
        mutation: UPDATE_PLAN_MEAL,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response) {
        dispatch(ClientPlanSlice.acceptNewClientPlan(response.data?.updatePlanMeal as ClientPlanBody));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const deleteClientPlanMeal = async (body: DeletePlanMealInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<DeletePlanMealResponse, DeletePlanMealRequest>({
        mutation: DELETE_PLAN_MEAL,
        variables: {
          input: {
            ...body,
          },
        },
      });
      response;
      if (response) {
        dispatch(ClientPlanSlice.acceptNewClientPlan(response.data?.deletePlanMeal as ClientPlanBody));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  return { createClientPlanMeal, updateClientPlanMeal, deleteClientPlanMeal };
}
