import { ApolloError, FetchResult } from '@apollo/client';
import { apolloClient } from 'src/graphql/ApolloClient';
import { SignUpProfessionalModel, SignUpProfessionalResponse, SignUpProfessionalRequest } from './authentication.types';
import { SIGN_UP_PROFESSIONAL } from './authenticationQueries';

export function useAuthentication() {
  const signUp = async (body: SignUpProfessionalModel): Promise<FetchResult<SignUpProfessionalResponse>> => {
    try {
      console.log('-----------body', body);
      const res = await apolloClient.mutate<SignUpProfessionalResponse, SignUpProfessionalRequest>({
        mutation: SIGN_UP_PROFESSIONAL,
        variables: {
          input: body,
        },
      });
      console.log('-----------res', res);

      return res;
      // eslint-disable-next-line no-console, @typescript-eslint/no-explicit-any
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  return { signUp };
}
