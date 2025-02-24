import { gql } from '@apollo/client';

export const GET_PROGRAM_BUILDER = gql`
  query _getProgramBuilderParameters {
    getAllDiseases {
      _id
      name
    }
    getAllDiseaseCauses {
      _id
      name
    }
    getAllNutritionalPreferences {
      _id
      name
    }
  }
`;
