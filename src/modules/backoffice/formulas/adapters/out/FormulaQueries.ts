import { gql } from '@apollo/client';

export const GET_FORMULA = gql`
  query _getFormula {
    getFormula {
      spanishGroupName
      formulaGroups {
        spanishFormulaName
        constants {
          spanishConstantName
          value
          case
        }
      }
    }
  }
`;
