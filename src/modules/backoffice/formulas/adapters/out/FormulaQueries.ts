import { gql } from '@apollo/client';

export const GET_FORMULA = gql`
  query _getFormula {
  getFormula {
    spanishGroupName
    formulaGroups {
        spanishFormulaName
        cases {
            spanishCaseLabel
            coefficients {
                variable
                value
            }
            constants {
                name
                value
            }
        }
        parameters {
            spanishParameterName
            valueCases {
                value
                case
            }
        }
    }
  }
}
`;
