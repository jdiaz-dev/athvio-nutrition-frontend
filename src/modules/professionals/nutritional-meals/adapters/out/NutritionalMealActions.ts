/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import * as NutritionalMealSlicers from 'src/modules/professionals/nutritional-meals/adapters/in/slicers/NutritionalMealSlice';
import * as NutritionalMealDetailsSlice from 'src/modules/professionals/nutritional-meals/adapters/in/slicers/NutritionalMealDetailsSlice';
import {
  CreateNutritionalMealRequest,
  CreateNutritionalMealResponse,
  GettNutritionalMealRequest,
  GetNutritionalMealsResponse,
  UpdateNutritionalMealBody,
  UpdateNutritionalMealResponse,
  UpdateNutritionalMealRequest,
  DeleteNutritionalMealRequest,
  DeleteNutritionalMealResponse,
  DeleteNutritionalMealBody,
  CreateNutritionalMealBody,
  GetNutritionalMealsBody,
} from 'src/modules/professionals/nutritional-meals/adapters/out/nutritionalMeal';
import {
  CREATE_NUTRITIONAL_MEAL,
  DELETE_NUTRITIONAL_MEAL,
  GET_NUTRITIONAL_MEALS,
  UPDATE_NUTRITIONAL_MEAL,
} from 'src/modules/professionals/nutritional-meals/adapters/out/NutritionalMealQueries';

export function useNutritionalMeal() {
  const dispatch = useDispatch();

  const createNutritionalMeal = async (body: CreateNutritionalMealBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<CreateNutritionalMealResponse, CreateNutritionalMealRequest>({
        mutation: CREATE_NUTRITIONAL_MEAL,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response.data) dispatch(NutritionalMealSlicers.addNutritionalMeal(response.data.createNutritionalMeal));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const getNutritionalMeals = async (body: GetNutritionalMealsBody) => {
    try {
      const response = await apolloClient.query<GetNutritionalMealsResponse, GettNutritionalMealRequest>({
        query: GET_NUTRITIONAL_MEALS,
        variables: {
          input: {
            ...body,
          },
        },
        fetchPolicy: 'network-only',
      });

      if (response.data) dispatch(NutritionalMealSlicers.showNutritionalMeals(response.data.getNutritionalMealsForProfessional));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const updateNutritionalMeal = async (body: UpdateNutritionalMealBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<UpdateNutritionalMealResponse, UpdateNutritionalMealRequest>({
        mutation: UPDATE_NUTRITIONAL_MEAL,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response.data) dispatch(NutritionalMealSlicers.updateNutritionalMeal(response.data.updateNutritionalMeal));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const deleteNutritionalMeal = async (body: DeleteNutritionalMealBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<DeleteNutritionalMealResponse, DeleteNutritionalMealRequest>({
        mutation: DELETE_NUTRITIONAL_MEAL,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response) dispatch(NutritionalMealDetailsSlice.reinitializeMeal());
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  return { createNutritionalMeal, getNutritionalMeals, updateNutritionalMeal, deleteNutritionalMeal };
}
