import { gql } from '@apollo/client';

export const CREATE_CALORY = gql`
  mutation _createCalory($input: CreateCaloryDto!) {
    createCalory(input: $input) {
      _id
      protein
      carbs
      fat
      calories
    }
  }
`;

export const GET_CALORY = gql`
  query _getCalory($input: GetCaloryDto!) {
    getCalory(input: $input) {
      _id
      protein
      carbs
      fat
      calories
    }
  }
`;

export const UPDATE_CALORY = gql`
  mutation _updateCalory($input: UpdateCaloryDto!) {
    updateCalory(input: $input) {
      _id
      protein
      carbs
      fat
      calories
    }
  }
`;
