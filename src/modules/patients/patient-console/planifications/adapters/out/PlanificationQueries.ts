import { gql } from '@apollo/client';

export const CREATE_PLANIFICATION = gql`
  mutation _createPlanification($input: CreatePlanificationDto!) {
    createPlanification(input: $input) {
      uuid
      patientInformation {
        weight
        height
        age
        gender
        physicActivityName
        physicActivityFactor
      }
      configuredMacros {
        proteinInPercentage
        carbsInPercentage
        fatInPercentage
        totalProtein
        totalCarbs
        totalFat
        totalCalories
      }
    }
  }
`;

export const GET_PLANIFICATIONS = gql`
  query _getPlanifications($input: GetPlanificationsDto!) {
    getPlanifications(input: $input) {
      uuid
      patientInformation {
        weight
        height
        age
        gender
        physicActivityName
        physicActivityFactor
      }
      configuredMacros {
        proteinInPercentage
        carbsInPercentage
        fatInPercentage
        totalProtein
        totalCarbs
        totalFat
        totalCalories
      }
      createdAt
    }
  }
`;

export const UPDATE_PLANIFICATION = gql`
  mutation _updatePlanification($input: UpdatePlanificationDto!) {
    updatePlanification(input: $input) {
      uuid
      patientInformation {
        weight
        height
        age
        gender
        physicActivityName
        physicActivityFactor
      }
      configuredMacros {
        protein
        carbs
        fat
        calories
      }
      createdAt
    }
  }
`;
