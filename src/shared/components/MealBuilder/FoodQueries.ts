import { gql } from '@apollo/client';

export const GET_FOODS = gql`
  query _getFoods($input: GetFoodsDto!) {
    getFoods(input: $input) {
      data {
        uuid
        foodId
        foodDatabase
        name
        ingredientDetails {
          ingredientType
          customIngredient {
            amount
            label
            name
            ingredients {
              name
              amount
              label
              weightInGrams
              protein
              carbs
              fat
              calories
            }
            macros {
              weightInGrams
              protein
              carbs
              fat
              calories
            }
          }
          equivalents {
            ingredientType
            customIngredient {
              name
              ingredients {
                name
                amount
                label
                weightInGrams
                protein
                carbs
                fat
                calories
              }
              macros {
                weightInGrams
                protein
                carbs
                fat
                calories
              }
            }
            ingredient {
              amount
              label
              weightInGrams
              protein
              carbs
              fat
              calories
            }
          }
          ingredient {
            name
            amount
            label
            weightInGrams
            protein
            carbs
            fat
            calories
          }
          equivalents {
            ingredientType
            customIngredient {
              name
              ingredients {
                amount
                name
                label
                weightInGrams
                protein
                carbs
                fat
                calories
              }
            }
            ingredient {
              amount
              name
              label
              weightInGrams
              protein
              carbs
              fat
              calories
            }
          }
        }
        macros {
          weightInGrams
          protein
          carbs
          fat
          calories
        }
        availableMeasures {
          uri
          label
          weightInGrams
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
