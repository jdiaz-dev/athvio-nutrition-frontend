/* eslint-disable @typescript-eslint/no-explicit-any */
import { apolloClient } from 'src/graphql/ApolloClient';
import { SIGN_UP } from 'src/modules/security/users/adapters/out/userQueries';

interface useUsersType {
  signUp: (input: any) => Promise<void>;
}
export function useUsers(): useUsersType {
  const signUp = async (body: any): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const input = {
      ...body,
    };

    // console.log('----------input', input);
    const response = await apolloClient.mutate({
      mutation: SIGN_UP,

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      variables: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        input,
      },
    });
    response;
    /* try {

      console.log(response);
      // eslint-disable-next-line no-console
    } catch (error: any) {
      console.log('--------error--------', error.graphQLErrors);
    } */
  };

  return { signUp };
}

/*
variables: {
          input: {
            firstName: 'zzzzz',
            lastName: 'zzzzz',
            email: 'pro2pro.com',
            password: 'pro',
            timezone: 'zzzzz',
            acceptedTerms: true,
            professionalInfo: {
              businessName: 'zzzzz',
              countryCode: 'zzzzz',
              phone: 'zzzzz',
              country: 'zzzzz',
            },
          },
        },
*/
