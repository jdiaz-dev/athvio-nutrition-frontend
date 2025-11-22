import { gql } from '@apollo/client';

export const GET_FORMULA = gql`
  query _getFormula {
    getFormula {
      spanishGroupName
      formulaGroups {
        spanishFormulaName
        cases {
          spanishCaseLabel
          case
          coefficients {
            variable
            value
          }
          constants {
            name
            value
          }
        }
        parameterDescription
        parameters {
          spanishParameterName
          description
          valueCases {
            value
            case
            spanishCase
          }
        }
      }
    }
  }
`;
