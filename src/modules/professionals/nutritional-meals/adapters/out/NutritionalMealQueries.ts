import { gql } from '@apollo/client';

export const CREATE_NUTRITIONAL_MEAL = gql`
  mutation _createNutritionalMeal($input: CreateNutritionalMealDto!) {
    createNutritionalMeal(input: $input) {
      uuid
      name
      professional
      name
      image
      ingredientDetails {
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
          internalFood
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
      cookingInstructions
      macros {
        weightInGrams
        protein
        carbs
        fat
        calories
      }
      source
    }
  }
`;

export const GET_NUTRITIONAL_MEALS = gql`
  query _getNutritionalMealsForProfessional($input: GetNutritionalMealsForProfessionalDto!) {
    getNutritionalMealsForProfessional(input: $input) {
      data {
        uuid
        professional
        name
        image
        imageSource
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
            internalFood
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
        cookingInstructions
        macros {
          weightInGrams
          protein
          carbs
          fat
          calories
        }
        source
      }
      meta {
        total
        offset
        limit
      }
    }
  }
`;

export const GET_NUTRITIONAL_MEAL_DATABASES = gql`
  query _getNutritionalMealDatabases {
    getNutritionalMealDatabases
  }
`;

export const UPDATE_NUTRITIONAL_MEAL = gql`
  mutation _updateNutritionalMeal($input: UpdateNutritionalMealDto!) {
    updateNutritionalMeal(input: $input) {
      uuid
      name
      professional
      name
      image
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
          internalFood
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
      cookingInstructions
      macros {
        weightInGrams
        protein
        carbs
        fat
        calories
      }
      source
    }
  }
`;

export const DELETE_NUTRITIONAL_MEAL = gql`
  mutation _deleteNutritionalMeal($input: DeleteNutritionalMealDto!) {
    deleteNutritionalMeal(input: $input) {
      uuid
      name
      professional
      name
      image
      ingredientDetails {
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
      cookingInstructions
      macros {
        weightInGrams
        protein
        carbs
        fat
        calories
      }
      source
    }
  }
`;
