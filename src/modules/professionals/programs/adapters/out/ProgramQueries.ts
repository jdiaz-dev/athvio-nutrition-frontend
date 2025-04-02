import { gql } from '@apollo/client';

export const CREATE_PROGRAM = gql`
  mutation _createProgram($input: CreateProgramDto!) {
    createProgram(input: $input) {
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

export const GET_PROGRAM = gql`
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

export const DELETE_PROGRAM = gql`
  mutation _deleteProgram($input: DeleteProgramDto!) {
    deleteProgram(input: $input) {
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
