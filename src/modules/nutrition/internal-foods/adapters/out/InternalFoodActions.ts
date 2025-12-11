import { ApolloError, FetchResult } from '@apollo/client';
import { apolloClient } from 'src/graphql/ApolloClient';
import { CALCULATE_NUTRIENTS } from 'src/modules/nutrition/internal-foods/adapters/out/InternalFoodQueries';
import {
  CalculateNutrientsInput,
  CalculateNutrientsRequest,
  CalculateNutrientsResponse,
} from 'src/modules/nutrition/internal-foods/types/nutrient';

export function useInternalFoods() {
  const calculateNutrients = async (body: CalculateNutrientsInput): Promise<FetchResult<CalculateNutrientsResponse>> => {
    try {
      const response = await apolloClient.mutate<CalculateNutrientsResponse, CalculateNutrientsRequest>({
        mutation: CALCULATE_NUTRIENTS,
        variables: {
          input: {
            ...body,
          },
        },
      });

      return response;
    } catch (error) {
      console.log('---------error in action', (error as ApolloError).graphQLErrors[0].message);
      throw error;
    }
  };

  return { calculateNutrients };
}
