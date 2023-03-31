import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import { resetCustomMealItem, setCustomMealList } from 'src/modules/professionals/custom-meals/adapters/in/CustomMealSlice';
import {
  CreateCustomMealRequest,
  CreateCustomMealResponse,
  CustomMealBody,
  GetCustomMealRequest,
  GetCustomMealsResponse,
  UpdateCustomMealBody,
  UpdateCustomMealResponse,
  UpdateCustomMealRequest,
  DeleteCustomMealRequest,
  DeleteCustomMealResponse,
  DeleteCustomMealBody,
} from 'src/modules/professionals/custom-meals/adapters/out/customMeal.types';
import {
  CREATE_CUSTOM_MEAL,
  DELETE_CUSTOM_MEAL,
  GET_CUSTOM_MEALS,
  UPDATE_CUSTOM_MEAL,
} from 'src/modules/professionals/custom-meals/adapters/out/CustomMealQueries';
import { GetRecordsBody } from 'src/shared/types/get-records.types';

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
  const getCustomMeals = async (body: GetRecordsBody) => {
    try {
      const response = await apolloClient.query<GetCustomMealsResponse, GetCustomMealRequest>({
        query: GET_CUSTOM_MEALS,
        variables: {
          input: {
            ...body,
          },
        },
        fetchPolicy: 'network-only',
      });

      console.log('--------getCustomMeals', response);
      if (response) dispatch(setCustomMealList(response.data.getCustomMeals));
      return response;
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const updateCustomMeal = async (body: UpdateCustomMealBody): Promise<void> => {
    const _body = { ...body };
    if (_body.__typename) {
      delete _body.__typename;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _body.ingredients = _body.ingredients.map(({ __typename, ...rest }) => rest);
    }
    console.log('---------_body', _body);
    try {
      const response = await apolloClient.mutate<UpdateCustomMealResponse, UpdateCustomMealRequest>({
        mutation: UPDATE_CUSTOM_MEAL,
        variables: {
          input: {
            ..._body,
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

  const deleteCustomMeal = async (body: DeleteCustomMealBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<DeleteCustomMealResponse, DeleteCustomMealRequest>({
        mutation: DELETE_CUSTOM_MEAL,
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
  return { createCustomMeal, getCustomMeals, updateCustomMeal, deleteCustomMeal };
}
