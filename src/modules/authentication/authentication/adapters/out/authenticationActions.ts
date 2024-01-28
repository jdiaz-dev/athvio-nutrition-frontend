import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import { resetUser } from 'src/modules/authentication/authentication/adapters/in/UserSlice';
import { UserSignUpModel } from './authentication.types';
import { SIGN_UP_CLIENT } from 'src/modules/patients/patients/adapters/out/PatientQueries';

export function useAuthentication() {
  const dispatch = useDispatch();

  const signUp = async (body: UserSignUpModel): Promise<void> => {
    try {
      const response = await apolloClient.mutate({
        mutation: SIGN_UP_CLIENT,
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
