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
      }
      plans {
        _id
        title
        week
        day
        mealPlans {
          _id
          mealTag
          position
          meals {
            name
            ingredients {
              name
              amount
              calories
            }
            cookingInstructions
            macros {
              protein
              carbs
              fat
              calories
            }
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
      }
      plans {
        _id
        title
        week
        day
        mealPlans {
          _id
          mealTag
          position
          meals {
            _id
            name
            ingredients {
              name
              amount
              calories
            }
            cookingInstructions
            macros {
              protein
              carbs
              fat
              calories
            }
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
        name
        description
        programTags {
          _id
          title
        }
        plans {
          mealPlans {
            _id
            mealTag
            position
            meals {
              name
              ingredients {
                name
                amount
                calories
              }
              cookingInstructions
              macros {
                protein
                carbs
                fat
                calories
              }
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
      name
      description
      programTags {
        _id
        title
      }
      plans {
        mealPlans {
          _id
          mealTag
          position
          meals {
            name
            ingredients {
              name
              amount
              calories
            }
            cookingInstructions
            macros {
              protein
              carbs
              fat
              calories
            }
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
      }
      plans {
        title
        week
        day
        mealPlans {
          _id
          mealTag
          position
          meals {
            name
            ingredients {
              name
              amount
              calories
            }
            cookingInstructions
            macros {
              protein
              carbs
              fat
              calories
            }
          }
        }
      }
    }
  }
`;
