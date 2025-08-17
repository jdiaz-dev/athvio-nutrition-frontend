import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import * as ProgramSlice from 'src/modules/professionals/programs/adapters/in/slicers/ProgramSlice';
import * as PlanSlice from 'src/modules/professionals/programs/adapters/in/slicers/PlanSlice';

import {
  CreateProgramBody,
  CreateProgramRequest,
  CreateProgramResponse,
  DeleteProgamResponse,
  ProgramInput,
  DeleteProgramRequest,
  GetProgramsRequest,
  GetProgramsResponse,
  UpdateProgramBody,
  UpdateProgramRequest,
  UpdateProgramResponse,
  GetProgramResponse,
  GetProgramRequest,
  GetProgramsBody,
  DuplicateProgramRequest,
  DuplicateProgramResponse,
  DuplicateProgramBody,
} from 'src/modules/professionals/programs/adapters/out/program.types';

import {
  CREATE_PROGRAM,
  DELETE_PROGRAM,
  DUPLICATE_PROGRAM,
  GET_PROGRAM,
  GET_PROGRAMS,
  UPDATE_PROGRAM,
} from 'src/modules/professionals/programs/adapters/out/ProgramQueries';

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
      if (response.data) {
        dispatch(ProgramSlice.acceptCreatedProgram(response.data.createProgram));
        dispatch(ProgramSlice.resetProgramItem());
      }
    } catch (error) {
      console.log('---------error in action', (error as ApolloError).graphQLErrors[0].message);
      dispatch(ProgramSlice.programError((error as ApolloError).graphQLErrors[0].message));
    }
  };
  const getProgram = async (body: ProgramInput) => {
    try {
      const response = await apolloClient.query<GetProgramResponse, GetProgramRequest>({
        query: GET_PROGRAM,
        variables: {
          input: {
            ...body,
          },
        },
        fetchPolicy: 'network-only',
      });
      if (response.data) {
        dispatch(ProgramSlice.acceptNewProgram(response.data.getProgram));
        dispatch(PlanSlice.acceptNewPlans(response.data.getProgram.plans));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const getPrograms = async (body: GetProgramsBody) => {
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

      if (response) {
        dispatch(ProgramSlice.acceptNewPrograms(response.data.getPrograms));
      }

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
      if (response.data) {
        dispatch(ProgramSlice.acceptUpdatedProgram(response.data.updateProgram));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const duplicateProgram = async (body: DuplicateProgramBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<DuplicateProgramResponse, DuplicateProgramRequest>({
        mutation: DUPLICATE_PROGRAM,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response.data) {
        dispatch(ProgramSlice.acceptSavedDuplicatedProgram(response.data.duplicateProgram));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const deleteProgram = async (body: ProgramInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<DeleteProgamResponse, DeleteProgramRequest>({
        mutation: DELETE_PROGRAM,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response) dispatch(ProgramSlice.resetProgramItem());
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  return { createProgram, getProgram, getPrograms, updateProgram, duplicateProgram, deleteProgram };
}
