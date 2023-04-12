import { gql } from '@apollo/client';

export const CREATE_MEAL_PLAN = gql`
  mutation _createMealPlan($input: AddMealPlanDto!) {
    createMealPlan(input: $input) {
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
          name
          position
          ingredients {
            amount
            name
            unit
            protein
            carbs
            fat
            calories
          }
          cookingInstruction
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

export const UPDATE_MEAL_PLAN = gql`
  mutation _updateMealPlan($input: UpdateMealPlanDto!) {
    updateMealPlan(input: $input) {
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
          name
          position
          ingredients {
            amount
            name
            unit
            protein
            carbs
            fat
            calories
          }
          cookingInstruction
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

export const DELETE_MEAL_PLAN = gql`
  mutation _deleteMealPlan($input: DeleteMealPlanDto!) {
    deleteMealPlan(input: $input) {
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
          name
          position
          ingredients {
            amount
            name
            unit
            protein
            carbs
            fat
            calories
          }
          cookingInstruction
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
