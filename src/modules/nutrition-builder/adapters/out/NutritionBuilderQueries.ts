import { gql } from '@apollo/client';

export const GET_PROGRAM_BUILDER = gql`
  query _getProgramBuilderParameters {
    getAllDiseases {
      uuid
      name
    }
    getAllDiseaseCauses {
      uuid
      name
    }
    getAllNutritionalPreferences {
      uuid
      name
    }
  }
`;

export const GENERATE_NUTRITIONAL_PLAN_FOR_PATIENT = gql`
  mutation _generateNutritionalPlanForPatient($input: GenerateNutritionalPlanDto!) {
    generateNutritionalPlanForPatient(input: $input) {
      meals {
        mealTag
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
          }
        }
        cookingInstructions
        macros {
          weightInGrams
          protein
          carbs
          fat
          calories
        }
      }
    }
  }
`;
