import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import * as PlanSlice from 'src/modules/professionals/programs/adapters/in/slicers/PlanSlice';
import * as ProgramSlice from 'src/modules/professionals/programs/adapters/in/slicers/ProgramSlice';

import {
  CreateProgramPlanBody,
  CreateProgramPlanRequest,
  CreateProgramPlanResponse,
  DeleteProgramPlanBody,
  DeleteProgramPlanRequest,
  DeleteProgramPlanResponse,
  DuplicateProgramPlanBody,
  DuplicateProgramPlanRequest,
  DuplicateProgramPlanResponse,
  UpdatePlanAssignedWeekDayBody,
  UpdatePlanAssignedWeekDayRequest,
  UpdatePlanAssignedWeekDayResponse,
} from 'src/modules/professionals/programs/adapters/out/Plan.types';

import {
  CREATE_PROGRAM_PLAN,
  DELETE_PROGRAM_PLAN,
  DUPLICATE_PROGRAM_PLAN,
  UPDATE_PLAN_ASSIGNED_WEKK_DAY,
} from 'src/modules/professionals/programs/adapters/out/PlanQueries';
import { Plan, ProgramBody } from 'src/modules/professionals/programs/adapters/out/program.types';

export function usePlan() {
  const dispatch = useDispatch();

  const createProgramPlan = async (body: CreateProgramPlanBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<CreateProgramPlanResponse, CreateProgramPlanRequest>({
        mutation: CREATE_PROGRAM_PLAN,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response.data) {
        dispatch(ProgramSlice.acceptNewProgram(response.data.addProgramPlan));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const updatePlanAssignedWeekDay = async (body: UpdatePlanAssignedWeekDayBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<UpdatePlanAssignedWeekDayResponse, UpdatePlanAssignedWeekDayRequest>({
        mutation: UPDATE_PLAN_ASSIGNED_WEKK_DAY,
        variables: {
          input: {
            ...body,
          },
        },
      });
      dispatch(ProgramSlice.acceptNewProgram(response.data?.updatePlanAssignedWeekDay as ProgramBody));
      dispatch(PlanSlice.acceptNewPlans(response.data?.updatePlanAssignedWeekDay.plans as Plan[]));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const duplicateProgramPlan = async (body: DuplicateProgramPlanBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<DuplicateProgramPlanResponse, DuplicateProgramPlanRequest>({
        mutation: DUPLICATE_PROGRAM_PLAN,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response.data) {
        dispatch(ProgramSlice.acceptNewProgram(response.data.duplicateProgramPlan as ProgramBody));
        dispatch(PlanSlice.acceptNewPlans(response.data.duplicateProgramPlan.plans as Plan[]));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const deletePlan = async (body: DeleteProgramPlanBody): Promise<void> => {
    try {
      const response = await apolloClient.mutate<DeleteProgramPlanResponse, DeleteProgramPlanRequest>({
        mutation: DELETE_PROGRAM_PLAN,
        variables: {
          input: {
            ...body,
          },
        },
      });
      // if (response) dispatch(PlanSlice.resetProgramItem());
      console.log(response);
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  return { createProgramPlan, updatePlanAssignedWeekDay, duplicateProgramPlan, deletePlan };
}
