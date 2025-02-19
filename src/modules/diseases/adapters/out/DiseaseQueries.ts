import { gql } from '@apollo/client';

export const GET_DISEASES = gql`
  query _getDiseases {
    getDiseases {
      _id
      name
    }
  }
`;
