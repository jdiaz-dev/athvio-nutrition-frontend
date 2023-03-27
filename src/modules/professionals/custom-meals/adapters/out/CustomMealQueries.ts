import { gql } from '@apollo/client';

export const CREATE_CUSTOM_MEAL = gql`
  mutation _createCustomMeal($input: CreateCustomMealDto!) {
    createCustomMeal(input: $input) {
      _id
      name
    }
  }
`;

export const GET_CUSTOM_MEALS = gql`
  query _getCustomMeals($input: GetCustomMealsDto!) {
    getCustomMeals(input: $input) {
      data {
        _id
        name
        ingredients {
          ingredientName
          amount
          protein
          carbs
          fat
          calories
        }
        recipe
        createdAt
      }
      meta {
        total
        offset
        limit
      }
    }
  }
`;
