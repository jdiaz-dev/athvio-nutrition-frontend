import { gql } from '@apollo/client';

export const CREATE_CLIENT_PLAN = gql`
  mutation _createClientPlan($input: CreateClientPlanDto!) {
    createClientPlan(input: $input) {
      _id
      assignedDate
      title
      meals {
        _id
        position
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

/* export const GET_PROGRAM = gql`
  query _getProgram($input: GetProgramDto!) {
    getProgram(input: $input) {
      _id
      professional
      name
      description
      programTags {
        _id
        title
      }
      plans {
        _id
        title
        week
        day
        meals {
          _id
          position
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
  }
`; */

export const GET_CLIENT_PLANS = gql`
  query _getClientPlans($input: GetClientPlansDto!) {
    getClientPlans(input: $input) {
      _id
      title
      assignedDate
      meals {
        _id
        position
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

export const UPDATE_CLIENT_PLAN = gql`
  mutation _updateClientPlan($input: UpdateClientPlanDto!) {
    updateClientPlan(input: $input) {
      _id
      title
      assignedDate
      meals {
        _id
        position
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

export const DELETE_CLIENT_PLAN = gql`
  mutation _deleteClientPlan($input: DeleteClientPlanDto!) {
    deleteClientPlan(input: $input) {
      _id
      title
      assignedDate
      meals {
        _id
        position
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
