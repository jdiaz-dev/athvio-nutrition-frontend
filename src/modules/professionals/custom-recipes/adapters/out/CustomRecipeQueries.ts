import { gql } from '@apollo/client';

export const CREATE_CUSTOM_RECIPE = gql`
  mutation _createCustomRecipe($input: CreateCustomRecipeDto!) {
    createCustomRecipe(input: $input) {
      _id
      name
      professional
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
    }
  }
`;

export const GET_CUSTOM_RECIPES = gql`
  query _getCustomRecipes($input: GetCustomRecipesDto!) {
    getCustomRecipes(input: $input) {
      data {
        _id
        professional
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
        cookingInstructions
        macros {
          weightInGrams
          protein
          carbs
          fat
          calories
        }
      }
      meta {
        total
        offset
        limit
      }
    }
  }
`;

export const UPDATE_CUSTOM_RECIPE = gql`
  mutation _updateCustomRecipe($input: UpdateCustomRecipeDto!) {
    updateCustomRecipe(input: $input) {
      _id
      name
      professional
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
`;

export const DELETE_CUSTOM_RECIPE = gql`
  mutation _deleteCustomRecipe($input: DeleteCustomRecipeDto!) {
    deleteCustomRecipe(input: $input) {
      _id
      name
      professional
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
`;
