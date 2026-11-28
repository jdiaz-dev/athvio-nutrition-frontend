import { ApolloError } from '@apollo/client';
import { apolloClient } from 'src/graphql/ApolloClient';
import {
  BodyMassIndexResult,
  CalculateBodyMassIndexInput,
  CalculateBodyMassIndexRequest,
  CalculateBodyMassIndexResponse,
} from 'src/modules/nutrition/formulas/types/formula';
import { CALCULATE_BODY_MASS_INDEX } from 'src/modules/nutrition/formulas/adapters/out/BodyMassIndexQueries';

export function useBodyMassIndex() {
  const calculateBodyMassIndex = async (input: CalculateBodyMassIndexInput): Promise<BodyMassIndexResult> => {
    try {
      const response = await apolloClient.query<CalculateBodyMassIndexResponse, CalculateBodyMassIndexRequest>({
        query: CALCULATE_BODY_MASS_INDEX,
        variables: { input },
      });
      return response.data.calculateBodyMassIndex;
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { calculateBodyMassIndex };
}
