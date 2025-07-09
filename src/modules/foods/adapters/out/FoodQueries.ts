import { gql } from '@apollo/client';

export const GET_FOODS = gql`
  query _getFoods($input: GetFoodsDto!) {
    getFoods(input: $input) {
      data {
        uuid
        name
      }
      meta {
        total
        limit
        offset
      }
    }
  }
`;
