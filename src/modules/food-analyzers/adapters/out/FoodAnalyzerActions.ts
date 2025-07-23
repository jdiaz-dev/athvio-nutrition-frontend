/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import * as FoodAnalyzerSlicers from 'src/modules/food-analyzers/adapters/in/slicers/FoodAnalyzerSlice';
import {
  GetAnalyzedFoodsBody,
  GetAnalyzedFoodsRequest,
  GetAnalyzedFoodsResponse,
} from 'src/modules/food-analyzers/adapters/out/FoodAnalyzer';
import { GET_ANALIZED_FOODS } from 'src/modules/food-analyzers/adapters/out/FoodAnalyzerQueries';

export function useFoodAnalyzer() {
  const dispatch = useDispatch();

  const getAnalyzedFoods = async (body: GetAnalyzedFoodsBody) => {
    try {
      const response = await apolloClient.query<GetAnalyzedFoodsResponse, GetAnalyzedFoodsRequest>({
        query: GET_ANALIZED_FOODS,
        variables: {
          input: {
            ...body,
          },
        },
        fetchPolicy: 'network-only',
      });

      if (response.data) dispatch(FoodAnalyzerSlicers.initializeFoodAnalizers(response.data.getAnalyzedFoods));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  return { getAnalyzedFoods };
}
