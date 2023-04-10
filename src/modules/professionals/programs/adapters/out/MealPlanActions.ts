import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import { resetProgramItem } from 'src/modules/professionals/programs/adapters/in/ProgramSlice';
import {
  CreateMealPlanBody,
  CreateMealPlanProgramResponse,
  CreateMealPlanRequest,
  UpdateMealPlanBody,
  UpdateMealPlanProgramResponse,
  UpdateMealPlanRequest,
} from 'src/modules/professionals/programs/adapters/out/mealPlan.types';
import { CREATE_MEAL_PLAN, UPDATE_MEAL_PLAN } from 'src/modules/professionals/programs/adapters/out/MealPlanQueries';

import { DeleteProgamResponse, ProgramInput, DeleteProgramRequest } from 'src/modules/professionals/programs/adapters/out/program.types';

import { DELETE_PROGRAM, GET_PROGRAMS, UPDATE_PROGRAM } from 'src/modules/professionals/programs/adapters/out/ProgramQueries';

export function useMealPlan() {
  const dispatch = useDispatch();

  const createMealPlan = async (body: CreateMealPlanBody): Promise<void> => {
    console.log('---------------------------body createMealPlan ', body);
    try {
      const response = await apolloClient.mutate<CreateMealPlanProgramResponse, CreateMealPlanRequest>({
        mutation: CREATE_MEAL_PLAN,
        variables: {
          input: {
            ...body,
          },
        },
      });
      console.log('---------------------------response createMealPlan ', response);
      // response;
      // if (response) dispatch(resetProgramItem());
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const updateMealPlan = async (body: UpdateMealPlanBody): Promise<void> => {
    console.log('---------------------------body UPDATE_MEAL_PLAN ', body);

    try {
      const response = await apolloClient.mutate<UpdateMealPlanProgramResponse, UpdateMealPlanRequest>({
        mutation: UPDATE_MEAL_PLAN,
        variables: {
          input: {
            ...body,
          },
        },
      });
      console.log('---------------------------response UPDATE_MEAL_PLAN ', response);
      // response;
      // if (response) dispatch(resetProgramItem());
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const deleteProgram = async (body: ProgramInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<DeleteProgamResponse, DeleteProgramRequest>({
        mutation: DELETE_PROGRAM,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response) dispatch(resetProgramItem());
      console.log(response);
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  return { createMealPlan, updateMealPlan, deleteProgram };
}
