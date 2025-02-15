/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import * as CustomRecipeSlicers from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeSlice';
import * as CustomRecipeDetailsSlice from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeDetailsSlice';
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
} from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';
import {
  CREATE_NUTRITIONAL_MEAL,
  DELETE_NUTRITIONAL_MEAL,
  GET_NUTRITIONAL_MEALS,
  UPDATE_NUTRITIONAL_MEAL,
} from 'src/modules/professionals/custom-recipes/adapters/out/CustomRecipeQueries';

export function useCustomRecipe() {
  const dispatch = useDispatch();

  const createCustomRecipe = async (body: CreateNutritionalMealBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<CreateNutritionalMealResponse, CreateNutritionalMealRequest>({
        mutation: CREATE_NUTRITIONAL_MEAL,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response.data) dispatch(CustomRecipeSlicers.addCustomRecipe(response.data.createNutritionalMeal));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const getCustomRecipes = async (body: GetNutritionalMealsBody) => {
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

      if (response.data) dispatch(CustomRecipeSlicers.showCustomRecipes(response.data.getNutritionalMeals));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const updateCustomRecipe = async (body: UpdateNutritionalMealBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<UpdateNutritionalMealResponse, UpdateNutritionalMealRequest>({
        mutation: UPDATE_NUTRITIONAL_MEAL,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response.data) dispatch(CustomRecipeSlicers.updateCustomRecipe(response.data.updateNutritionalMeal));
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
      if (response) dispatch(CustomRecipeDetailsSlice.reinitializeMeal());
      console.log(response);
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  return { createCustomRecipe, getCustomRecipes, updateCustomRecipe, deleteNutritionalMeal };
}
