import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import * as PlanSlice from 'src/modules/professionals/programs/adapters/in/slicers/PlanSlice';
import {
  CreateMealPlanBody,
  CreateMealPlanProgramResponse,
  CreateMealPlanRequest,
  DeleteMealPlanBody,
  DeleteMealPlanRequest,
  DeleteMealPlanResponse,
  UpdateMealPlanBody,
  UpdateMealPlanResponse,
  UpdateMealPlanRequest,
} from 'src/modules/professionals/programs/adapters/out/mealPlan.types';
import { CREATE_MEAL_PLAN, DELETE_MEAL_PLAN, UPDATE_MEAL_PLAN } from 'src/modules/professionals/programs/adapters/out/MealPlanQueries';

import { Plan } from 'src/modules/professionals/programs/adapters/out/program.types';

export function useMealPlan() {
  const dispatch = useDispatch();

  const createMealPlan = async (body: CreateMealPlanBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<CreateMealPlanProgramResponse, CreateMealPlanRequest>({
        mutation: CREATE_MEAL_PLAN,
        variables: {
          input: {
            ...body,
          },
        },
      });
      dispatch(PlanSlice.acceptNewPlans(response.data?.createMealPlan.plans as unknown as Plan[]));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const updateMealPlan = async (body: UpdateMealPlanBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<UpdateMealPlanResponse, UpdateMealPlanRequest>({
        mutation: UPDATE_MEAL_PLAN,
        variables: {
          input: {
            ...body,
          },
        },
      });
      dispatch(PlanSlice.acceptNewPlans(response.data?.updateMealPlan.plans as unknown as Plan[]));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const deleteMealPlan = async (body: DeleteMealPlanBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<DeleteMealPlanResponse, DeleteMealPlanRequest>({
        mutation: DELETE_MEAL_PLAN,
        variables: {
          input: {
            ...body,
          },
        },
      });
      dispatch(PlanSlice.acceptNewPlans(response.data?.deleteMealPlan.plans as unknown as Plan[]));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  return { createMealPlan, updateMealPlan, deleteMealPlan };
}
