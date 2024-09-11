import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import {
  PatientPlanBody,
  CreatePatientPlanInput,
  CreatePatientPlanRequest,
  CreatePatientPlanResponse,
  DeletePatientPlanInput,
  DeletePatientPlanRequest,
  DeletePatientPlanResponse,
  DuplicatePatientPlanInput,
  DuplicatePatientPlanRequest,
  DuplicatePatientPlanResponse,
  GetPatientPlansRequest,
  GetPatientPlansResponse,
  GetRecordsPatientPlansBody,
  UpdatePatientPlanInput,
  UpdatePatientPlanRequest,
  UpdatePatientPlanResponse,
} from 'src/modules/patients/patient-console/patient-plans/adapters/out/patientPlan.types';
import * as PatientPlanSlice from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/PatientPlanSlice';
import {
  CREATE_CLIENT_PLAN,
  DELETE_CLIENT_PLAN,
  DUPLICATE_CLIENT_PLAN,
  GET_CLIENT_PLANS,
  UPDATE_CLIENT_PLAN,
} from 'src/modules/patients/patient-console/patient-plans/adapters/out/PatientPlanQueries';

export function usePatientPlan() {
  const dispatch = useDispatch();

  const createPatientPlan = async (body: CreatePatientPlanInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<CreatePatientPlanResponse, CreatePatientPlanRequest>({
        mutation: CREATE_CLIENT_PLAN,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response) dispatch(PatientPlanSlice.acceptNewPatientPlan(response.data?.createPatientPlan as PatientPlanBody));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  /* const getPatientPlan = async (body: ProgramInput) => {
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

      if (response) {
        dispatch(ProgramSlice.acceptNewProgram(response.data.getProgram));
        dispatch(PatientPlanSlice.acceptNewPlans(response.data.getProgram.plans));
      }

      return response;
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  }; */
  const getPatientPlans = async (body: GetRecordsPatientPlansBody) => {
    try {
      const response = await apolloClient.query<GetPatientPlansResponse, GetPatientPlansRequest>({
        query: GET_CLIENT_PLANS,
        variables: {
          patientPlans: {
            ...body,
          },
        },
        fetchPolicy: 'network-only',
      });

      if (response) {
        dispatch(PatientPlanSlice.acceptNewPatientPlans(response.data.getPatientPlans));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const updatePatientPlan = async (body: UpdatePatientPlanInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<UpdatePatientPlanResponse, UpdatePatientPlanRequest>({
        mutation: UPDATE_CLIENT_PLAN,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response.data) {
        dispatch(PatientPlanSlice.modififyingSpecificPatientPlan(response.data?.updatePatientPlan));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const duplicatePatientPlan = async (body: DuplicatePatientPlanInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<DuplicatePatientPlanResponse, DuplicatePatientPlanRequest>({
        mutation: DUPLICATE_CLIENT_PLAN,
        variables: {
          input: {
            ...body,
          },
        },
      });
      console.log('---------response', response);
      // getPatientPlans({ professional: body.professional, patient: body.patient });
      if (response) dispatch(PatientPlanSlice.acceptNewPatientPlan(response.data?.duplicatePatientPlan as PatientPlanBody));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const deletePatientPlan = async (body: DeletePatientPlanInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<DeletePatientPlanResponse, DeletePatientPlanRequest>({
        mutation: DELETE_CLIENT_PLAN,
        variables: {
          input: {
            ...body,
          },
        },
      });
      response;
      // dispatch(PatientPlanSlice.acceptNewPlans(response.data?.deleteMeal.plans as unknown as Plan[]));
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  return { createPatientPlan, getPatientPlans, updatePatientPlan, duplicatePatientPlan, deletePatientPlan };
}
