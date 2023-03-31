import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import { resetProgramItem, setProgramList } from 'src/modules/professionals/programs/adapters/in/ProgramSlice';

import {
  CreateProgramBody,
  CreateProgramRequest,
  CreateProgramResponse,
  DeleteProgamResponse,
  DeleteProgramBody,
  DeleteProgramRequest,
  GetProgramsRequest,
  GetProgramsResponse,
  UpdateProgramBody,
  UpdateProgramRequest,
  UpdateProgramResponse,
} from 'src/modules/professionals/programs/adapters/out/program.types';

import {
  CREATE_PROGRAM,
  DELETE_PROGRAM,
  GET_PROGRAMS,
  UPDATE_PROGRAM,
} from 'src/modules/professionals/programs/adapters/out/ProgramQueries';
import { GetRecordsBody } from 'src/shared/types/get-records.types';

export function useProgram() {
  const dispatch = useDispatch();

  const createProgram = async (body: CreateProgramBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<CreateProgramResponse, CreateProgramRequest>({
        mutation: CREATE_PROGRAM,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response) dispatch(resetProgramItem());
      console.log(response);
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const getPrograms = async (body: GetRecordsBody) => {
    try {
      const response = await apolloClient.query<GetProgramsResponse, GetProgramsRequest>({
        query: GET_PROGRAMS,
        variables: {
          input: {
            ...body,
          },
        },
        fetchPolicy: 'network-only',
      });

      if (response) dispatch(setProgramList(response.data.getPrograms));
      return response;
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const updateProgram = async (body: UpdateProgramBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<UpdateProgramResponse, UpdateProgramRequest>({
        mutation: UPDATE_PROGRAM,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response) dispatch(resetProgramItem());
      console.log(response);
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const deleteProgram = async (body: DeleteProgramBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<DeleteProgamResponse, DeleteProgramRequest>({
        mutation: DELETE_PROGRAM,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response) dispatch(resetProgramItem());
      console.log(response);
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  return { createProgram, getPrograms, updateProgram, deleteProgram };
}
