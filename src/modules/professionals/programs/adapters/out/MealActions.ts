import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import * as PlanSlice from 'src/modules/professionals/programs/adapters/in/slicers/PlanSlice';
import {
  CreateMealBody,
  CreateMealResponse,
  CreateMealRequest,
  DeleteMealBody,
  DeleteMealRequest,
  DeleteMealResponse,
  UpdateMealBody,
  UpdateMealResponse,
  UpdateMealRequest,
} from 'src/modules/professionals/programs/adapters/out/meal.types';
import { CREATE_MEAL, DELETE_MEAL, UPDATE_MEAL } from 'src/modules/professionals/programs/adapters/out/MealQueries';

import { Plan } from 'src/modules/professionals/programs/adapters/out/program.types';

export function useMeal() {
  const dispatch = useDispatch();

  const createMeal = async (body: CreateMealBody): Promise<void> => {
    console.log('----------------createMeal body', body);
    try {
      const response = await apolloClient.mutate<CreateMealResponse, CreateMealRequest>({
        mutation: CREATE_MEAL,
        variables: {
          input: {
            ...body,
          },
        },
      });
      dispatch(PlanSlice.acceptNewPlans(response.data?.createMeal.plans as unknown as Plan[]));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const updateMeal = async (body: UpdateMealBody): Promise<void> => {
    console.log('----------------updateMeal body', body);
    try {
      const response = await apolloClient.mutate<UpdateMealResponse, UpdateMealRequest>({
        mutation: UPDATE_MEAL,
        variables: {
          input: {
            ...body,
          },
        },
      });
      dispatch(PlanSlice.acceptNewPlans(response.data?.updateMeal.plans as unknown as Plan[]));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const deleteMeal = async (body: DeleteMealBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<DeleteMealResponse, DeleteMealRequest>({
        mutation: DELETE_MEAL,
        variables: {
          input: {
            ...body,
          },
        },
      });
      dispatch(PlanSlice.acceptNewPlans(response.data?.deleteMeal.plans as unknown as Plan[]));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  return { createMeal, updateMeal, deleteMeal };
}
