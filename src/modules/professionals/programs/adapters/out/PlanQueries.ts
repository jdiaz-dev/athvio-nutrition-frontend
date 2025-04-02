import { gql } from '@apollo/client';

export const CREATE_PROGRAM_PLAN = gql`
  mutation _addProgramPlan($input: AddProgramPlanDto!) {
    addProgramPlan(input: $input) {
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
`;

export const UPDATE_PLAN_ASSIGNED_WEKK_DAY = gql`
  mutation _updatePlanAssignedWeekDay($input: UpdatePlanAssignedWeekDayDto!) {
    updatePlanAssignedWeekDay(input: $input) {
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
`;

export const DUPLICATE_PROGRAM_PLAN = gql`
  mutation _duplicateProgramPlan($input: DuplicateProgramPlanDto!) {
    duplicateProgramPlan(input: $input) {
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
`;

export const DELETE_PROGRAM_PLAN = gql`
  mutation _deleteProgramPlan($input: DeleteProgramPlanDto!) {
    deleteProgramPlan(input: $input) {
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
`;
