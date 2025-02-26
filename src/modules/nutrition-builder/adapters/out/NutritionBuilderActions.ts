import { ApolloError } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { apolloClient } from 'src/graphql/ApolloClient';
import * as nutritionBuilderSlice from 'src/modules/nutrition-builder/adapters/in/slicers/NutritionBuilderSlice';

import {
  BuildNutritionalPlanInput,
  BuildNutritionalPlanRequest,
  BuildNutritionalPlanResponse,
  GetProgramBuilderParametersResponse,
} from 'src/modules/nutrition-builder/adapters/out/nutritionBuilder';
import {
  GENERATE_NUTRITIONAL_PLAN_FOR_PATIENT,
  GET_PROGRAM_BUILDER,
} from 'src/modules/nutrition-builder/adapters/out/NutritionBuilderQueries';
import * as PatientPlanSlice from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/PatientPlanSlice';

export function useNutritionBuilder() {
  const dispatch = useDispatch();

  const getNutritionBuilderParameters = async () => {
    try {
      const response = await apolloClient.query<GetProgramBuilderParametersResponse>({
        query: GET_PROGRAM_BUILDER,
        fetchPolicy: 'network-only',
      });
      if (response.data) {
        dispatch(nutritionBuilderSlice.initializeParameters(response.data));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };
  const generateNutritionalPlanForPatient = async (body: BuildNutritionalPlanInput) => {
    try {
      const response = await apolloClient.mutate<BuildNutritionalPlanResponse, BuildNutritionalPlanRequest>({
        mutation: GENERATE_NUTRITIONAL_PLAN_FOR_PATIENT,
        variables: {
          input: {
            ...body,
          },
        },
      });
      if (response.data) {
        dispatch(PatientPlanSlice.acceptNewPatientPlans(response.data.generateNutritionalPlanForPatient));
      }
    } catch (error) {
      console.log('-------------error graphQLErrors', (error as ApolloError).graphQLErrors);
      throw error;
    }
  };

  return { getNutritionBuilderParameters, generateNutritionalPlanForPatient };
}
