import { FetchResult } from '@apollo/client';
import { apolloClient } from 'src/graphql/ApolloClient';
import { GET_USER, UPDATE_USER } from './userQueries';
import {
  GetUserInput,
  GetUserRequest,
  GetUserResponse,
  UpdateUserInput,
  UpdateUserRequest,
  UpdateUserResponse,
} from 'src/modules/auth/users/adapters/out/user';

export function userActions() {
  const getUser = async (input: GetUserInput): Promise<FetchResult<GetUserResponse>> => {
    const res = await apolloClient.query<GetUserResponse, GetUserRequest>({
      query: GET_USER,
      variables: {
        input: {
          ...input,
        },
      },
    });
    return res;
  };
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

  return { getUser, updateUser };
}
