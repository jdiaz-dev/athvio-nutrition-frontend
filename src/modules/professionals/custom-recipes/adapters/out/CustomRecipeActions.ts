/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import {
  reinitializeCustomRecipe,
  showCustomRecipes,
} from 'src/modules/professionals/custom-recipes/adapters/in/CustomRecipeSlice';
import {
  CreateCustomRecipeRequest,
  CreateCustomRecipeResponse,
  CustomRecipeBody,
  GetCustomRecipeRequest,
  GetCustomRecipesResponse,
  UpdateCustomRecipeBody,
  UpdateCustomRecipeResponse,
  UpdateCustomRecipeRequest,
  DeleteCustomRecipeRequest,
  DeleteCustomRecipeResponse,
  DeleteCustomRecipeBody,
} from 'src/modules/professionals/custom-recipes/adapters/out/customRecipe.types';
import {
  CREATE_CUSTOM_RECIPE,
  DELETE_CUSTOM_RECIPE,
  GET_CUSTOM_RECIPES,
  UPDATE_CUSTOM_RECIPE,
} from 'src/modules/professionals/custom-recipes/adapters/out/CustomRecipeQueries';
import { GetRecordsBody } from 'src/shared/types/get-records.types';

export function useCustomRecipe() {
  const dispatch = useDispatch();

  const createCustomRecipe = async (body: CustomRecipeBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<CreateCustomRecipeResponse, CreateCustomRecipeRequest>({
        mutation: CREATE_CUSTOM_RECIPE,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response) dispatch(reinitializeCustomRecipe());
      // console.log(response);
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const getCustomRecipes = async (body: GetRecordsBody) => {
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

      // console.log('--------getCustomRecipes', response);
      if (response) dispatch(showCustomRecipes(response.data.getCustomRecipes));
      return response;
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const updateCustomRecipe = async (body: UpdateCustomRecipeBody): Promise<void> => {
    const _body = { ...body };
    const { __typename, ...restBody } = _body;
    const { __typename: typeName, ...restMacros } = restBody.macros;
    restBody.ingredients = _body.ingredients.map(({ __typename, ...rest }) => rest);
    restBody.macros = restMacros;

    try {
      const response = await apolloClient.mutate<UpdateCustomRecipeResponse, UpdateCustomRecipeRequest>({
        mutation: UPDATE_CUSTOM_RECIPE,
        variables: {
          input: {
            ...restBody,
          },
        },
      });
      if (response) dispatch(reinitializeCustomRecipe());
      // console.log(response);
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
      if (response) dispatch(reinitializeCustomRecipe());
      console.log(response);
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  return { createCustomRecipe, getCustomRecipes, updateCustomRecipe, deleteCustomRecipe };
}
