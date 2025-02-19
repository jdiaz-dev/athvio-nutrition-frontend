import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import * as DiseasesSlice from 'src/modules/diseases/adapters/in/slicers/DiseasesSlice';

import { GetDiseasesResponse } from 'src/modules/diseases/adapters/out/disease';
import { GET_DISEASES } from 'src/modules/diseases/adapters/out/DiseaseQueries';

export function useDisease() {
  const dispatch = useDispatch();

  const getDiseases = async () => {
    try {
      const response = await apolloClient.query<GetDiseasesResponse>({
        query: GET_DISEASES,
        fetchPolicy: 'network-only',
      });
      if (response.data) {
        dispatch(DiseasesSlice.acceptNewDiseases(response.data.getDiseases));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { getDiseases };
}
