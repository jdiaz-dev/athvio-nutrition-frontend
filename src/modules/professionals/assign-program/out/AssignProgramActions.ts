import { ApolloError } from '@apollo/client';
import { apolloClient } from 'src/graphql/ApolloClient';

import { ASSIGN_PROGRAM } from 'src/modules/professionals/assign-program/out/AssignProgramQueries';
import {
  AssignProgramBody,
  AssignProgramRequest,
  AssignProgramResponse,
} from 'src/modules/professionals/assign-program/out/AssignProgram.types';

export function useAssignProgram() {

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
        console.log('-----------response', response)
        // dispatch(ProgramSlice.resetProgramItem());
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { assignProgram };
}
