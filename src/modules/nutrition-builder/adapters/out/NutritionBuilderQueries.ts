import { gql } from '@apollo/client';

export const GET_NUTRITION_BUILDER = gql`
  query _getNutritionBuilderParameters {
    getDiseases {
      _id
      name
    }
    getDiseaseCauses {
      _id
      name
    }
    getNutritionalPreferences {
      _id
      name
    }
  }
`;
