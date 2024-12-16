import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import { PATIENT_PLAN_MEALS_CRUD } from 'src/modules/patients/patient-console/patient-plans/adapters/out/PlanMealQueries';
import {
  PatientPlanMealsCrudRequest,
  PatientPlanMealsCrudResponse,
} from 'src/modules/patients/patient-console/patient-plans/adapters/out/planMeal.types';
import * as PatientPlanSlice from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/PatientPlanSlice';

export function usePatientPlanMeal() {
  const dispatch = useDispatch();
  const patientPlanMealCrud = async (body: PatientPlanMealsCrudRequest): Promise<void> => {
    try {
      const response = await apolloClient.mutate<PatientPlanMealsCrudResponse, PatientPlanMealsCrudRequest>({
        mutation: PATIENT_PLAN_MEALS_CRUD,
        variables: {
          ...body,
        },
      });

      if (response.data?.deletePlanMeal) {
        dispatch(PatientPlanSlice.modififyingSpecificPatientPlan(response.data.deletePlanMeal));
      } else if (response.data?.updatePlanMeal) {
        dispatch(PatientPlanSlice.modififyingSpecificPatientPlan(response.data.updatePlanMeal));
      } else if (response.data?.addPlanMeal) {
        dispatch(PatientPlanSlice.modififyingSpecificPatientPlan(response.data.addPlanMeal));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { patientPlanMealCrud };
}
