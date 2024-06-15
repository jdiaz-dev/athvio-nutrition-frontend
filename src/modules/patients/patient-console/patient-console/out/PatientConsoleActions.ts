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

  const getPatientForConsole = async (body: GetRecordsPatientPlansBody) => {
    try {
      const response = await apolloClient.query<GetPatientPlansResponse, GetPatientPlansRequest>({
        query: GET_CLIENT_PLANS,
        variables: {
          input: {
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

  return { getPatientForConsole };
}
