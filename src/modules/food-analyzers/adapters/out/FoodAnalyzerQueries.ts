import { gql } from '@apollo/client';

export const GET_ANALIZED_FOODS = gql`
  query _getAnalyzedFoods($input: GetAnalyzedFoodsDto!) {
    getAnalyzedFoods(input: $input) {
      uuid
      englishName
      spanishName
      compounds {
        uuid
        englishName
        spanishName
        mechanisms {
          uuid
          englishName
          spanishName
          englishDescription
          spanishDescription
          englishRelatedDisease
          spanishRelatedDisease
        }
      }
    }
  }
`;
