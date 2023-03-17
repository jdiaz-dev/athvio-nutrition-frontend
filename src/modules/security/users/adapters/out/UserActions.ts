import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import { resetUser } from 'src/modules/security/users/adapters/in/UserSlice';
import { UserSignUpModel } from 'src/modules/security/users/adapters/out/user.types';
import { SIGN_UP } from 'src/modules/security/users/adapters/out/userQueries';

export function useUsers() {
  const dispatch = useDispatch();

  const signUp = async (body: UserSignUpModel): Promise<void> => {
    try {
      const response = await apolloClient.mutate({
        mutation: SIGN_UP,
        variables: {
          input: body,
        },
      });
      if (response) dispatch(resetUser());
      console.log(response);
      // eslint-disable-next-line no-console, @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw error;
    }
  };
  return { signUp };
}
