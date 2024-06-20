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
            professional: '6673734729a8ffa437766dac',
            patient: '66738999b3b27e362bca7ba7',
          },
          chat: {
            professional: '6673734729a8ffa437766dac',
            patient: '66738999b3b27e362bca7ba7',
          },
          patient: {
            professional: '6673734729a8ffa437766dac',
            patient: '66738999b3b27e362bca7ba7',
          },
          professional: {
            professional: '6673734729a8ffa437766dac',
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
