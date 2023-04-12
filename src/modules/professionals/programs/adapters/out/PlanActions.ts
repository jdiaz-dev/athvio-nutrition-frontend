import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import * as PlanSlice from 'src/modules/professionals/programs/adapters/in/slicers/PlanSlice';

import {
  CreateProgramPlanBody,
  CreateProgramPlanRequest,
  CreateProgramPlanResponse,
  DeleteProgramPlanBody,
  DeleteProgramPlanRequest,
  DeleteProgramPlanResponse,
} from 'src/modules/professionals/programs/adapters/out/Plan.types';
import { CREATE_PROGRAM_PLAN, DELETE_PROGRAM_PLAN } from 'src/modules/professionals/programs/adapters/out/PlanQueries';
import { Plan, ProgramBody } from 'src/modules/professionals/programs/adapters/out/program.types';

export function usePlan() {
  const dispatch = useDispatch();

  const createPlan = async (body: CreateProgramPlanBody): Promise<void> => {
    console.log('---------------------------body createProgramPlan ', body);
    try {
      const response = await apolloClient.mutate<CreateProgramPlanResponse, CreateProgramPlanRequest>({
        mutation: CREATE_PROGRAM_PLAN,
        variables: {
          input: {
            ...body,
          },
        },
      });
      console.log('---------------------------response createProgramPlan ', response);
      const irrealLastIndex = 99999;
      const lastPlanCreatedIndex = (response.data?.addProgramPlan as ProgramBody).plans.length - 1 || irrealLastIndex;

      dispatch(PlanSlice.acceptNewPlans(response.data?.addProgramPlan.plans as Plan[]));
      dispatch(PlanSlice.acceptNewPlan(response.data?.addProgramPlan.plans[lastPlanCreatedIndex] as Plan));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const deletePlan = async (body: DeleteProgramPlanBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<DeleteProgramPlanResponse, DeleteProgramPlanRequest>({
        mutation: DELETE_PROGRAM_PLAN,
        variables: {
          input: {
            ...body,
          },
        },
      });
      // if (response) dispatch(resetProgramItem());
      console.log(response);
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  return { createPlan, deletePlan };
}
