import { gql } from '@apollo/client';

export const GET_BIOLOGICAL_TERRAIN_ASSESSMENT = gql`
  query _getBiologicalTerrainAssessment($input: GetBiologicalTerrainAssesmentDto!) {
    getBiologicalTerrainAssessment(input: $input) {
      uuid
      patient
      totalScore
      generalObservations {
        uuid
        key
        label
        value
      }
      functionalScreeningQuestions {
        uuid
        question
        score
        note
      }
    }
  }
`;

export const SAVE_BIOLOGICAL_TERRAIN_ASSESSMENT = gql`
  mutation _updateBiologicalTerrainAssessment($input: UpdateBiologicalTerrainAssessmentDto!) {
    updateBiologicalTerrainAssessment(input: $input) {
      uuid
      patient
      totalScore
      generalObservations {
        uuid
        key
        label
        value
      }
      functionalScreeningQuestions {
        uuid
        question
        score
        note
      }
    }
  }
`;
