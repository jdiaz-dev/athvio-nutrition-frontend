import { FetchResult } from '@apollo/client';
import { apolloClient } from 'src/graphql/ApolloClient';
import { UPDATE_USER } from './userQueries';
import { GetUserResponse, UpdateUserInput, UpdateUserRequest, UpdateUserResponse } from 'src/modules/auth/users/adapters/out/user';

export function userActions() {
  const updateUser = async (input: UpdateUserInput): Promise<FetchResult<GetUserResponse>> => {
    const res = await apolloClient.mutate<UpdateUserResponse, UpdateUserRequest>({
      mutation: UPDATE_USER,
      variables: {
        input: {
          ...input,
        },
      },
    });
    return res;
  };

  return { updateUser };
}
