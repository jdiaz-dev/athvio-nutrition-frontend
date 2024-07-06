import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import * as PatientPlanSlice from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/PatientPlanSlice';
import * as ChatSlice from 'src/modules/patients/patient-console/chat/adapters/in/slicers/ChatSlice';
import * as PatientSlice from 'src/modules/patients/patient-console/patient/adapters/in/slicers/PatientSlice';
import * as ProfessionalSlice from 'src/modules/professionals/professional/adapters/in/slicers/ProfessionalSlice';

import { GET_PATIENT_FOR_CONSOLE } from 'src/modules/patients/patient-console/patient-console/out/PatientConsoleQueries';
import {
  GetPatientForConsoleRequest,
  GetPatientForConsoleResponse,
} from 'src/modules/patients/patient-console/patient-console/out/PatientConsole';

export function usePatientConsole() {
  const dispatch = useDispatch();

  const getPatientForConsole = async (body: GetPatientForConsoleRequest) => {
    try {
      const response = await apolloClient.query<GetPatientForConsoleResponse, GetPatientForConsoleRequest>({
        query: GET_PATIENT_FOR_CONSOLE,
        variables: body,
        fetchPolicy: 'network-only',
      });
      if (response) {
        dispatch(PatientPlanSlice.acceptNewPatientPlans(response.data.getPatientPlans));
        dispatch(ChatSlice.acceptNewPatientChat(response.data.getChat));
        dispatch(PatientSlice.acceptNewPatient(response.data.getPatient));
        dispatch(ProfessionalSlice.acceptNewProfessional(response.data.getProfessional));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { getPatientForConsole };
}
