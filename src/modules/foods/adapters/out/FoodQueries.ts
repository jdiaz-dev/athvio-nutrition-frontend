import { gql } from '@apollo/client';

export const GET_FOODS = gql`
  query _getFoods($input: GetFoodsDto!) {
    getFoods(input: $input) {
      data {
        _id
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
