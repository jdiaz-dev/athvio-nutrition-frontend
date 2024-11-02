import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import * as PlanSlice from 'src/modules/professionals/programs/adapters/in/slicers/PlanSlice';
import * as ProgramSlice from 'src/modules/professionals/programs/adapters/in/slicers/ProgramSlice';
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

export function usePlanMeal() {
  const dispatch = useDispatch();

  const createPlanMeal = async (body: CreateMealBody): Promise<void> => {
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

  const updatePlanMeal = async (body: UpdateMealBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<UpdateMealResponse, UpdateMealRequest>({
        mutation: UPDATE_MEAL,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response.data) {

        dispatch(PlanSlice.acceptNewPlans(response.data.updateMeal.plans as unknown as Plan[]));
        
        //todo: delete this
        // dispatch(ProgramSlice.acceptNewProgram(response.data.updateMeal));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const deletePlanMeal = async (body: DeleteMealBody): Promise<void> => {
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
  return { createPlanMeal, updatePlanMeal, deletePlanMeal };
}
