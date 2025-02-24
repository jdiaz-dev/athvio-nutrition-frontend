import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import * as nutritionBuilderSlice from 'src/modules/nutrition-builder/adapters/in/slicers/NutritionBuilderSlice';

import {
  BuildNutritionalPlanInput,
  BuildNutritionalPlanRequest,
  BuildNutritionalPlanResponse,
  GetProgramBuilderParametersResponse,
} from 'src/modules/nutrition-builder/adapters/out/nutritionBuilder';
import { GET_PROGRAM_BUILDER } from 'src/modules/nutrition-builder/adapters/out/NutritionBuilderQueries';

export function useNutritionBuilder() {
  const dispatch = useDispatch();

  const getNutritionBuilderParameters = async () => {
    try {
      const response = await apolloClient.query<GetProgramBuilderParametersResponse>({
        query: GET_PROGRAM_BUILDER,
        fetchPolicy: 'network-only',
      });
      if (response.data) {
        dispatch(nutritionBuilderSlice.initializeParameters(response.data));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const buildNutritionalPlan = async (body: BuildNutritionalPlanInput) => {

    console.log('------body', body)
    /* try {
      const response = await apolloClient.mutate<BuildNutritionalPlanResponse, BuildNutritionalPlanRequest>({
        mutation: GET_PROGRAM_BUILDER,
        variables: {
          input: {
            ...body,
          },
        },
      });
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    } */
  };

  return { getNutritionBuilderParameters, buildNutritionalPlan };
}
