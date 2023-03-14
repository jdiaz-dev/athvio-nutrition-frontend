import { apolloClient } from 'src/graphql/ApolloClient';
import { SIGN_UP } from 'src/modules/security/users/adapters/in/userQuries';

export default function useUsers() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const signUp = async (input: any) => {
    const response = await apolloClient.mutate({
      mutation: SIGN_UP,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      variables: { input },
    });

    console.log(response);
  };

  return { signUp };
}
