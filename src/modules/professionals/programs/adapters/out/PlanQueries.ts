import { gql } from '@apollo/client';

export const CREATE_PROGRAM_PLAN = gql`
  mutation _addProgramPlan($input: AddProgramPlanDto!) {
    addProgramPlan(input: $input) {
      _id
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
          position
          name
          ingredients {
            amount
            unit
            name
            protein
            carbs
            fat
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
`;

export const DELETE_PROGRAM_PLAN = gql`
  mutation _deleteProgramPlan($input: DeleteProgramPlanDto!) {
    deleteProgramPlan(input: $input) {
      _id
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
          position
          name
          ingredients {
            amount
            unit
            name
            protein
            carbs
            fat
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
`;
