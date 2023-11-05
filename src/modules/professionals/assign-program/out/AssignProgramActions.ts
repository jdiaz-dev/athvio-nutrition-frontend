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
} from 'src/modules/professionals/programs/adapters/out/program.types';

import { ASSIGN_PROGRAM } from 'src/modules/professionals/assign-program/out/AssignProgramQueries';
import {
  AssignProgramBody,
  AssignProgramRequest,
  AssignProgramResponse,
} from 'src/modules/professionals/assign-program/out/AssignProgram.types';

export function useAssignProgram() {
  const dispatch = useDispatch();

  const assignProgram = async (body: AssignProgramBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<AssignProgramResponse, AssignProgramRequest>({
        mutation: ASSIGN_PROGRAM,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response) {
        dispatch(ProgramSlice.resetProgramItem());
      }
      console.log(response);
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { assignProgram };
}
