import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import {
  GetPatientPlansRequest,
  GetPatientPlansResponse,
} from 'src/modules/patients/patient-console/patient-plans/adapters/out/patientPlan.types';
import * as PatientPlanSlice from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/PatientPlanSlice';

import { GET_PATIENT_FOR_CONSOLE } from 'src/modules/patients/patient-console/patient-console/out/PatientConsoleQueries';

export function usePatientConsole() {
  const dispatch = useDispatch();

  const getPatientForConsole = async (/* body: GetRecordsPatientPlansBody */) => {
    try {
      const response = await apolloClient.query<GetPatientPlansResponse, GetPatientPlansRequest>({
        query: GET_PATIENT_FOR_CONSOLE,
        variables: {
          patientPlans: {
            professional: '66493c26091cb4d8d83bedaf',
            patient: '66493d52091cb4d8d83bedc4',
          },
          chat: {
            professional: '66493c26091cb4d8d83bedaf',
            patient: '66493d52091cb4d8d83bedc4',
          },
          patient: {
            professional: '66493c26091cb4d8d83bedaf',
            patient: '66493d52091cb4d8d83bedc4',
          },
        },
        fetchPolicy: 'network-only',
      });

      if (response) {
        // dispatch(PatientPlanSlice.acceptNewPatientPlans(response.data.getPatientPlans));
      }
      
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { getPatientForConsole };
}
