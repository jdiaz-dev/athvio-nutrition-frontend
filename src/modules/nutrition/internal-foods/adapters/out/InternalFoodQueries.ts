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
          spanishLabel
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

const fragment = `
  fragment NutrientFields on Nutrient {
    label
    spanishLabel
    quantity
    unit
  }
`;
export const CALCULATE_FOODS_NUTRIENTS = gql`
  ${fragment}

  mutation _calculateFoodsNutrients($input: CalculateFoodsNutrientsDto!) {
    calculateFoodsNutrients(input: $input) {
      CA {
        ...NutrientFields
      }
      CHOCDF_NET {
        ...NutrientFields
      }
      CHOCDF {
        ...NutrientFields
      }
      CHOLE {
        ...NutrientFields
      }
      ENERC_KCAL {
        ...NutrientFields
      }
      FAMS {
        ...NutrientFields
      }
      FAT {
        ...NutrientFields
      }
      FAPU {
        ...NutrientFields
      }
      FASAT {
        ...NutrientFields
      }
      FATRN {
        ...NutrientFields
      }
      FIBTG {
        ...NutrientFields
      }
      FOLDFE {
        ...NutrientFields
      }
      FOLFD {
        ...NutrientFields
      }
      FOLAC {
        ...NutrientFields
      }
      FE {
        ...NutrientFields
      }
      K {
        ...NutrientFields
      }
      MG {
        ...NutrientFields
      }
      NA {
        ...NutrientFields
      }
      NIA {
        ...NutrientFields
      }
      P {
        ...NutrientFields
      }
      PROCNT {
        ...NutrientFields
      }
      RIBF {
        ...NutrientFields
      }
      SUGAR {
        ...NutrientFields
      }
      SUGAR_ADDED {
        ...NutrientFields
      }
      THIA {
        ...NutrientFields
      }
      TOCPHA {
        ...NutrientFields
      }
      VITA_RAE {
        ...NutrientFields
      }
      VITB12 {
        ...NutrientFields
      }
      VITB6A {
        ...NutrientFields
      }
      VITC {
        ...NutrientFields
      }
      VITD {
        ...NutrientFields
      }
      VITK1 {
        ...NutrientFields
      }
      WATER {
        ...NutrientFields
      }
      ZN {
        ...NutrientFields
      }
    }
  }
`;

export const CALCULATE_NUTRIENTS_BY_MEASURE = gql`
  ${fragment}

  mutation _calculateNutrientsByMeasure($input: CalculateNutrientsByMeasureDto!) {
    calculateNutrientsByMeasure(input: $input) {
      CA {
        ...NutrientFields
      }
      CHOCDF_NET {
        ...NutrientFields
      }
      CHOCDF {
        ...NutrientFields
      }
      CHOLE {
        ...NutrientFields
      }
      ENERC_KCAL {
        ...NutrientFields
      }
      FAMS {
        ...NutrientFields
      }
      FAT {
        ...NutrientFields
      }
      FAPU {
        ...NutrientFields
      }
      FASAT {
        ...NutrientFields
      }
      FATRN {
        ...NutrientFields
      }
      FIBTG {
        ...NutrientFields
      }
      FOLDFE {
        ...NutrientFields
      }
      FOLFD {
        ...NutrientFields
      }
      FOLAC {
        ...NutrientFields
      }
      FE {
        ...NutrientFields
      }
      K {
        ...NutrientFields
      }
      MG {
        ...NutrientFields
      }
      NA {
        ...NutrientFields
      }
      NIA {
        ...NutrientFields
      }
      P {
        ...NutrientFields
      }
      PROCNT {
        ...NutrientFields
      }
      RIBF {
        ...NutrientFields
      }
      SUGAR {
        ...NutrientFields
      }
      SUGAR_ADDED {
        ...NutrientFields
      }
      THIA {
        ...NutrientFields
      }
      TOCPHA {
        ...NutrientFields
      }
      VITA_RAE {
        ...NutrientFields
      }
      VITB12 {
        ...NutrientFields
      }
      VITB6A {
        ...NutrientFields
      }
      VITC {
        ...NutrientFields
      }
      VITD {
        ...NutrientFields
      }
      VITK1 {
        ...NutrientFields
      }
      WATER {
        ...NutrientFields
      }
      ZN {
        ...NutrientFields
      }
    }
  }
`;
