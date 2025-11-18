import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import { GetFormulaResponse } from 'src/modules/backoffice/formulas/types/formula';
import * as FormulaSlice from 'src/modules/backoffice/formulas/adapters/in/slicers/FormulaSlice';

import { GET_FORMULA } from 'src/modules/backoffice/formulas/adapters/out/FormulaQueries';

export function useFormula() {
  const dispatch = useDispatch();

  const getFormulas = async (): Promise<void> => {
    try {
      const response = await apolloClient.query<GetFormulaResponse>({
        query: GET_FORMULA,
      });
      if (response.data) {
        dispatch(FormulaSlice.initializeFormula(response.data.getFormula));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { getFormulas };
}
