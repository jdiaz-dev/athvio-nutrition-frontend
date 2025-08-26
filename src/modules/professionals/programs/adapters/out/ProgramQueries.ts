import { gql } from '@apollo/client';

export const CREATE_PROGRAM = gql`
  mutation _createProgram($input: CreateProgramDto!) {
    createProgram(input: $input) {
      uuid
      professional
      name
      description
      programTags {
        uuid
        title
      }
      plans {
        uuid
        title
        week
        day
        meals {
          uuid
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

export const GET_PROGRAM = gql`
  query _getProgram($input: GetProgramDto!) {
    getProgram(input: $input) {
      uuid
      professional
      name
      description
      programTags {
        uuid
        title
      }
      plans {
        uuid
        title
        week
        day
        meals {
          uuid
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

export const GET_PROGRAMS = gql`
  query _getPrograms($input: GetProgramsDto!) {
    getPrograms(input: $input) {
      data {
        uuid
        professional
        name
        description
        programTags {
          uuid
          title
        }
        plans {
          uuid
          title
          week
          day
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

export const UPDATE_PROGRAM = gql`
  mutation _updateProgram($input: UpdateProgramDto!) {
    updateProgram(input: $input) {
      uuid
      professional
      name
      description
      programTags {
        uuid
        title
      }
      plans {
        uuid
        title
        week
        day
        meals {
          uuid
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

export const DUPLICATE_PROGRAM = gql`
  mutation _duplicateProgram($input: DuplicateProgramDto!) {
    duplicateProgram(input: $input) {
      uuid
      professional
      name
      description
      programTags {
        uuid
        title
      }
      plans {
        uuid
        title
        week
        day
        meals {
          uuid
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

export const DELETE_PROGRAM = gql`
  mutation _deleteProgram($input: DeleteProgramDto!) {
    deleteProgram(input: $input) {
      uuid
      professional
      name
      description
      programTags {
        uuid
        title
      }
      plans {
        uuid
        title
        week
        day
        meals {
          uuid
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
