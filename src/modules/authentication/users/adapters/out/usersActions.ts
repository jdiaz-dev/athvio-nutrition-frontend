import { FetchResult } from '@apollo/client';
import { apolloClient } from 'src/graphql/ApolloClient';
import { GET_USER } from './userQueries';
import { GetUserInput, GetUserRequest, GetUserResponse } from 'src/modules/authentication/users/adapters/out/user';

export function userActions() {
  const getUser = async (input: GetUserInput): Promise<FetchResult<GetUserResponse>> => {
    const res = await apolloClient.mutate<GetUserResponse, GetUserRequest>({
      mutation: GET_USER,
      variables: {
        input: {
          ...input,
        },
      },
    });
    return res;
  };

  return { getUser };
}
