import { gql } from '@apollo/client';

export const CREATE_MEAL_PLAN = gql`
  mutation _createMealPlan($input: AddMealPlanDto!) {
    createMealPlan(input: $input) {
      _id
      name
      description
      programTags {
        _id
      }
      plans {
        _id
        week
        day
        mealPlans {
          _id
          name
          ingredients {
            amount
            name
            unit
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
      name
      description
      programTags {
        _id
      }
      plans {
        _id
        week
        day
        mealPlans {
          _id
          name
          ingredients {
            amount
            name
            protein
            carbs
            fat
            calories
          }
          macros {
            protein
          }
        }
      }
    }
  }
`;
