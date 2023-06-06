import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import {
  CreateClientPlanInput,
  CreateClientPlanRequest,
  CreateClientPlanResponse,
  DeleteClientPlanInput,
  DeleteClientPlanRequest,
  DeleteClientPlanResponse,
  GetClientPlansRequest,
  GetClientPlansResponse,
  UpdateClientPlanInput,
  UpdateClientPlanRequest,
  UpdateClientPlanResponse,
} from 'src/modules/clients/client-plans/adapters/out/clientPlan.types';
import * as ClientPlanSlice from 'src/modules/clients/client-plans/adapters/in/slicers/ClientPlanSlice';
import { GetRecordsBody } from 'src/shared/types/get-records.types';
import {
  CREATE_CLIENT_PLAN,
  DELETE_CLIENT_PLAN,
  GET_CLIENT_PLANS,
  UPDATE_CLIENT_PLAN,
} from 'src/modules/clients/client-plans/adapters/out/ClientPlanQueries';

export function useClientPlan() {
  const dispatch = useDispatch();

  const createClientPlan = async (body: CreateClientPlanInput): Promise<void> => {
    console.log('----------------createMeal body', body);
    try {
      const response = await apolloClient.mutate<CreateClientPlanResponse, CreateClientPlanRequest>({
        mutation: CREATE_CLIENT_PLAN,
        variables: {
          input: {
            ...body,
          },
        },
      });
      response;
      // dispatch(ClientPlanSlice.acceptNewClientPlan(response.data?.data.createClientPlan));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  /* const getClientPlan = async (body: ProgramInput) => {
    try {
      const response = await apolloClient.query<GetProgramResponse, GetProgramRequest>({
        query: GET_PROGRAM,
        variables: {
          input: {
            ...body,
          },
        },
        fetchPolicy: 'network-only',
      });

      if (response) {
        dispatch(ProgramSlice.acceptNewProgram(response.data.getProgram));
        dispatch(ClientPlanSlice.acceptNewPlans(response.data.getProgram.plans));
      }

      return response;
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  }; */
  const getClientPlans = async (body: GetRecordsBody) => {
    try {
      const response = await apolloClient.query<GetClientPlansResponse, GetClientPlansRequest>({
        query: GET_CLIENT_PLANS,
        variables: {
          input: {
            ...body,
          },
        },
        fetchPolicy: 'network-only',
      });

      if (response) {
        dispatch(ClientPlanSlice.acceptNewClientPlans(response.data.getClientPlans));
      }

      return response;
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const updateClientPlan = async (body: UpdateClientPlanInput): Promise<void> => {
    console.log('----------------updateClientPlan body', body);
    try {
      const response = await apolloClient.mutate<UpdateClientPlanResponse, UpdateClientPlanRequest>({
        mutation: UPDATE_CLIENT_PLAN,
        variables: {
          input: {
            ...body,
          },
        },
      });
      response;
      // dispatch(ClientPlanSlice.acceptNewClientPlan(response.data?.updateMeal.plans as unknown as Plan[]));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const deleteClientPlan = async (body: DeleteClientPlanInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<DeleteClientPlanResponse, DeleteClientPlanRequest>({
        mutation: DELETE_CLIENT_PLAN,
        variables: {
          input: {
            ...body,
          },
        },
      });
      response;
      // dispatch(ClientPlanSlice.acceptNewPlans(response.data?.deleteMeal.plans as unknown as Plan[]));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  return { createClientPlan, getClientPlans, updateClientPlan, deleteClientPlan };
}
