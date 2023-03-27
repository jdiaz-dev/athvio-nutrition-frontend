import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import {
  CreateCustomMealRequest,
  CreateCustomMealResponse,
  CustomMeal,
  GetCustomMealRequest,
  GetCustomMealResponse,
  GetCustomMealsBody,
} from 'src/modules/professionals/custom-meals/adapters/out/customMeal.types';
import {
  CREATE_CUSTOM_MEAL,
  GET_CUSTOM_MEALS,
} from 'src/modules/professionals/custom-meals/adapters/out/CustomMealQueries';

export function useCustomMeal() {
  const dispatch = useDispatch();

  const createCustomMeal = async (body: CustomMeal): Promise<void> => {
    console.log('------body', body);
    try {
      const response = await apolloClient.mutate<CreateCustomMealResponse, CreateCustomMealRequest>({
        mutation: CREATE_CUSTOM_MEAL,
        variables: {
          input: {
            ...body,
          },
        },
      });
      // if (response) dispatch(resetUser());
      console.log(response);
      // eslint-disable-next-line no-console, @typescript-eslint/no-explicit-any
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const getCustomMeals = async (body: GetCustomMealsBody) => {
    console.log('----------body', body);
    try {
      const response = await apolloClient.query<GetCustomMealResponse, GetCustomMealRequest>({
        query: GET_CUSTOM_MEALS,
        variables: {
          input: {
            ...body,
          },
        },
      });
      // if (response) dispatch(resetUser());
      console.log('----------response get', response);
      return response;
      // eslint-disable-next-line no-console, @typescript-eslint/no-explicit-any
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  return { createCustomMeal, getCustomMeals };
}
