import { gql } from '@apollo/client';

export const GET_PATIENT_FOR_CONSOLE = gql`
  query _getPatientForConsole(
    $patientPlans: GetPatientPlansForWebDto!
    $chat: GetChatDto!
    $patient: GetPatientForWebDto!
    $professional: GetProfessionalDto!
  ) {
    getPatientPlansForWeb(patientPlans: $patientPlans) {
      _id
      title
      assignedDate
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
    getChat(chat: $chat) {
      _id
      patient
      professional
      comments {
        _id
        commenter
        content
        createdAt
      }
    }
    getPatientForWeb(patient: $patient) {
      _id
      user {
        _id
        firstname
        lastname
        email
        photo
      }
    }
    getProfessional(professional: $professional) {
      _id
      user {
        _id
        firstname
        lastname
        photo
      }
    }
  }
`;
