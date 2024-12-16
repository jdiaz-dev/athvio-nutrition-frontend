import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import * as ProgramSlice from 'src/modules/professionals/programs/adapters/in/slicers/ProgramSlice';
import * as PlanSlice from 'src/modules/professionals/programs/adapters/in/slicers/PlanSlice';
import { ProgramPlanMealCrudRequest, ProgramPlanMealCrudResponse } from 'src/modules/professionals/programs/adapters/out/meal.types';
import { PROGRAM_PLAN_MEALS_CRUD } from 'src/modules/professionals/programs/adapters/out/MealQueries';

export function usePlanMeal() {
  const dispatch = useDispatch();

  const programPlanMealCRUD = async (body: ProgramPlanMealCrudRequest): Promise<void> => {
    try {
      const response = await apolloClient.mutate<ProgramPlanMealCrudResponse, ProgramPlanMealCrudRequest>({
        mutation: PROGRAM_PLAN_MEALS_CRUD,
        variables: {
          ...body,
        },
      });
      if (response.data?.deleteMeal) {
        dispatch(ProgramSlice.acceptNewProgram(response.data.deleteMeal));
        dispatch(PlanSlice.acceptNewPlans(response.data.deleteMeal.plans));
      } else if (response.data?.updateMeal) {
        dispatch(ProgramSlice.acceptNewProgram(response.data.updateMeal));
        dispatch(PlanSlice.acceptNewPlans(response.data.updateMeal.plans));
      } else if (response.data?.createMeal) {
        dispatch(ProgramSlice.acceptNewProgram(response.data.createMeal));
        dispatch(PlanSlice.acceptNewPlans(response.data.createMeal.plans));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { programPlanMealCRUD };
}
