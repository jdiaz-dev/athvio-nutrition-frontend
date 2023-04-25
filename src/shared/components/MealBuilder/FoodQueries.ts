import { gql } from '@apollo/client';

export const GET_FOODS = gql`
  query _getFoods($input: GetFoodsDto!) {
    getFoods(input: $input) {
      data {
        name
        macros {
          protein
          carbs
          fat
          calories
        }
        defaultMeasure {
          amount
          unit
        }
        measures {
          uri
          label
          weight
        }
      }
      meta {
        total
        limit
        offset
        foodProviderSessions {
          title
          nextSession
        }
      }
    }
  }
`;

export const GET_AUTOCOMPLETE_FOOD_NAMES = gql`
  query _getAutoCompleteFoodNames($input: GetAutocompleteFoodNamesDto!) {
    getAutoCompleteFoodNames(input: $input) {
      foodNames
    }
  }
`;

export const GET_FOOD_DATABASES = gql`
  query _getFoodDatabases {
    getFoodDatabases
  }
`;
