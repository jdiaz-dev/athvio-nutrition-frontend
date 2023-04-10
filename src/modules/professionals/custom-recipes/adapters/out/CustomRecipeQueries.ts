import { gql } from '@apollo/client';

export const CREATE_CUSTOM_RECIPE = gql`
  mutation _createCustomRecipe($input: CreateCustomRecipeDto!) {
    createCustomRecipe(input: $input) {
      _id
      name
    }
  }
`;

export const GET_CUSTOM_RECIPES = gql`
  query _getCustomRecipes($input: GetCustomRecipesDto!) {
    getCustomRecipes(input: $input) {
      data {
        _id
        name
        professional
        ingredients {
          name
          amount
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
      meta {
        total
        offset
        limit
      }
    }
  }
`;

export const UPDATE_CUSTOM_RECIPE = gql`
  mutation _updateCustomRecipe($input: UpdateCustomRecipeDto!) {
    updateCustomRecipe(input: $input) {
      _id
      professional
      name
      ingredients {
        name
      }
    }
  }
`;

export const DELETE_CUSTOM_RECIPE = gql`
  mutation _deleteCustomRecipe($input: DeleteCustomRecipeDto!) {
    deleteCustomRecipe(input: $input) {
      _id
      name
    }
  }
`;
