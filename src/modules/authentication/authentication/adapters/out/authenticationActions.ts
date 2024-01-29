import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import { resetUser } from 'src/modules/authentication/authentication/adapters/in/UserSlice';
import { SignUpProfessionalModel, SignUpRequest } from './authentication.types';
import { SIGN_UP_PROFESSIONAL } from './authenticationQueries';
import { SignInResponse } from 'src/modules/authentication/security/adapters/out/security.types';

export function useAuthentication() {
  const dispatch = useDispatch();

  const signUp = async (body: SignUpProfessionalModel): Promise<void> => {
    try {
      const response = await apolloClient.mutate<SignInResponse, SignUpRequest>({
        mutation: SIGN_UP_PROFESSIONAL,
        variables: {
          input: body,
        },
      });
      if (response) dispatch(resetUser());
      console.log(response);
      // eslint-disable-next-line no-console, @typescript-eslint/no-explicit-any
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  return { signUp };
}
