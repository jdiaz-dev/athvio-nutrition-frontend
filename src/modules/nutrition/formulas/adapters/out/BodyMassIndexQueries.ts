import { gql } from '@apollo/client';

export const CALCULATE_BODY_MASS_INDEX = gql`
  query _calculateBodyMassIndex($input: CalculateBodyMassIndexDto!) {
    calculateBodyMassIndex(input: $input) {
      bodyMassIndex
      classification
      source
      rangeLabel
      zScore
      weightGainMinKg
      weightGainMaxKg
    }
  }
`;
