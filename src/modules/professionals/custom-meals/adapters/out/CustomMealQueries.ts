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
        professional
        ingredients {
          ingredientName
          amount
          unit
          protein
          carbs
          fat
          calories
        }
        totalProtein
        totalCarbs
        totalFat
        totalCalories
        recipe
      }
      meta {
        total
        offset
        limit
      }
    }
  }
`;

export const UPDATE_CUSTOM_MEAL = gql`
  mutation _updateCustomMeal($input: UpdateCustomMealDto!) {
    updateCustomMeal(input: $input) {
      _id
      name
      professional
      ingredients {
        ingredientName
        amount
        unit
        protein
        carbs
        fat
        calories
      }
      recipe
    }
  }
`;

export const DELETE_CUSTOM_MEAL = gql`
  mutation _deleteCustomMeal($input: DeleteCustomMealDto!) {
    deleteCustomMeal(input: $input) {
      _id
      name
    }
  }
`;
