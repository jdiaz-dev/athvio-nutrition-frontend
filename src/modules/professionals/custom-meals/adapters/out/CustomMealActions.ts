import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import {
  resetCustomMealItem,
  setCustomMealList,
} from 'src/modules/professionals/custom-meals/adapters/in/CustomMealSlice';
import {
  CreateCustomMealRequest,
  CreateCustomMealResponse,
  CustomMealBody,
  GetCustomMealRequest,
  GetCustomMealsResponse,
  GetCustomMealsBody,
  UpdateCustomMealBody,
  UpdateCustomMealResponse,
  UpdateCustomMealRequest,
} from 'src/modules/professionals/custom-meals/adapters/out/customMeal.types';
import {
  CREATE_CUSTOM_MEAL,
  GET_CUSTOM_MEALS,
  UPDATE_CUSTOM_MEAL,
} from 'src/modules/professionals/custom-meals/adapters/out/CustomMealQueries';

export function useCustomMeal() {
  const dispatch = useDispatch();

  const createCustomMeal = async (body: CustomMealBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<CreateCustomMealResponse, CreateCustomMealRequest>({
        mutation: CREATE_CUSTOM_MEAL,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response) dispatch(resetCustomMealItem());
      console.log(response);
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const getCustomMeals = async (body: GetCustomMealsBody) => {
    console.log('---------body', body);
    try {
      const response = await apolloClient.query<GetCustomMealsResponse, GetCustomMealRequest>({
        query: GET_CUSTOM_MEALS,
        variables: {
          input: {
            ...body,
          },
        },
      });

      if (response) dispatch(setCustomMealList(response.data.getCustomMeals));
      return response;
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const updateCustomMeal = async (body: UpdateCustomMealBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<UpdateCustomMealResponse, UpdateCustomMealRequest>({
        mutation: UPDATE_CUSTOM_MEAL,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response) dispatch(resetCustomMealItem());
      console.log(response);
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  return { createCustomMeal, getCustomMeals, updateCustomMeal };
}
