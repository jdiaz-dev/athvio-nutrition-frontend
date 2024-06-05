import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import { CREATE_PLAN_MEAL, DELETE_PLAN_MEAL, UPDATE_PLAN_MEAL } from 'src/modules/patients/patient-console/patient-plans/adapters/out/PlanMealQueries';
import { PatientPlanBody } from 'src/modules/patients/patient-console/patient-plans/adapters/out/patientPlan.types';
import {
  AddPatientPlanRequest,
  AddPatientPlanResponse,
  CreatePatientPlanMealInput,
  DeletePlanMealInput,
  DeletePlanMealRequest,
  DeletePlanMealResponse,
  UpdatePatientPlanMealInput,
  UpdatePlanMealRequest,
  UpdatePlanMealResponse,
} from 'src/modules/patients/patient-console/patient-plans/adapters/out/planMeal.types';
import * as PatientPlanSlice from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/PatientPlanSlice';

export function usePatientPlanMeal() {
  const dispatch = useDispatch();
  const createPatientPlanMeal = async (body: CreatePatientPlanMealInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<AddPatientPlanResponse, AddPatientPlanRequest>({
        mutation: CREATE_PLAN_MEAL,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response) {
        dispatch(PatientPlanSlice.acceptNewPatientPlan(response.data?.addPlanMeal as PatientPlanBody));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const updatePatientPlanMeal = async (body: UpdatePatientPlanMealInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<UpdatePlanMealResponse, UpdatePlanMealRequest>({
        mutation: UPDATE_PLAN_MEAL,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response) {
        dispatch(PatientPlanSlice.acceptNewPatientPlan(response.data?.updatePlanMeal as PatientPlanBody));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  const deletePatientPlanMeal = async (body: DeletePlanMealInput): Promise<void> => {
    try {
      const response = await apolloClient.mutate<DeletePlanMealResponse, DeletePlanMealRequest>({
        mutation: DELETE_PLAN_MEAL,
        variables: {
          input: {
            ...body,
          },
        },
      });
      response;
      if (response) {
        dispatch(PatientPlanSlice.acceptNewPatientPlan(response.data?.deletePlanMeal as PatientPlanBody));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  return { createPatientPlanMeal, updatePatientPlanMeal, deletePatientPlanMeal };
}
