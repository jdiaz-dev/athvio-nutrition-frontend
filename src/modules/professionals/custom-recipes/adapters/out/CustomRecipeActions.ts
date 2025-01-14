/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import * as CustomRecipeSlicers from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeSlice';
import * as CustomRecipeDetailsSlice from 'src/modules/professionals/custom-recipes/adapters/in/slicers/CustomRecipeDetailsSlice';
import {
  CreateCustomRecipeRequest,
  CreateCustomRecipeResponse,
  GetCustomRecipeRequest,
  GetCustomRecipesResponse,
  UpdateCustomRecipeBody,
  UpdateCustomRecipeResponse,
  UpdateCustomRecipeRequest,
  DeleteCustomRecipeRequest,
  DeleteCustomRecipeResponse,
  DeleteCustomRecipeBody,
  CreateCustomRecipeBody,
  GetCustomRecipesBody,
} from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';
import {
  CREATE_CUSTOM_RECIPE,
  DELETE_CUSTOM_RECIPE,
  GET_CUSTOM_RECIPES,
  UPDATE_CUSTOM_RECIPE,
} from 'src/modules/professionals/custom-recipes/adapters/out/CustomRecipeQueries';

export function useCustomRecipe() {
  const dispatch = useDispatch();

  const createCustomRecipe = async (body: CreateCustomRecipeBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<CreateCustomRecipeResponse, CreateCustomRecipeRequest>({
        mutation: CREATE_CUSTOM_RECIPE,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response.data) dispatch(CustomRecipeSlicers.addCustomRecipe(response.data.createCustomRecipe));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const getCustomRecipes = async (body: GetCustomRecipesBody) => {
    try {
      const response = await apolloClient.query<GetCustomRecipesResponse, GetCustomRecipeRequest>({
        query: GET_CUSTOM_RECIPES,
        variables: {
          input: {
            ...body,
          },
        },
        fetchPolicy: 'network-only',
      });

      if (response.data) dispatch(CustomRecipeSlicers.showCustomRecipes(response.data.getCustomRecipes));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const updateCustomRecipe = async (body: UpdateCustomRecipeBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<UpdateCustomRecipeResponse, UpdateCustomRecipeRequest>({
        mutation: UPDATE_CUSTOM_RECIPE,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response.data) dispatch(CustomRecipeSlicers.updateCustomRecipe(response.data.updateCustomRecipe));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const deleteCustomRecipe = async (body: DeleteCustomRecipeBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<DeleteCustomRecipeResponse, DeleteCustomRecipeRequest>({
        mutation: DELETE_CUSTOM_RECIPE,
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
  return { createCustomRecipe, getCustomRecipes, updateCustomRecipe, deleteCustomRecipe };
}
