import { gql } from '@apollo/client';

export const CALCULATE_NUTRIENTS = gql`
  fragment NutrientFields on Nutrient {
    label
    spanishLabel
    quantity
    unit
  }

  mutation _calculateNutrients($input: CalculateNutrientsDto!) {
    calculateNutrients(input: $input) {
      CA {
        ...NutrientFields
      }
      CHOCDF_NET {
        ...NutrientFields
      }
      CHOCDF {
        ...NutrientFields
      }
      CHOLE {
        ...NutrientFields
      }
      ENERC_KCAL {
        ...NutrientFields
      }
      FAMS {
        ...NutrientFields
      }
      FAT {
        ...NutrientFields
      }
      FAPU {
        ...NutrientFields
      }
      FASAT {
        ...NutrientFields
      }
      FATRN {
        ...NutrientFields
      }
      FIBTG {
        ...NutrientFields
      }
      FOLDFE {
        ...NutrientFields
      }
      FOLFD {
        ...NutrientFields
      }
      FOLAC {
        ...NutrientFields
      }
      FE {
        ...NutrientFields
      }
      K {
        ...NutrientFields
      }
      MG {
        ...NutrientFields
      }
      NA {
        ...NutrientFields
      }
      NIA {
        ...NutrientFields
      }
      P {
        ...NutrientFields
      }
      PROCNT {
        ...NutrientFields
      }
      RIBF {
        ...NutrientFields
      }
      SUGAR {
        ...NutrientFields
      }
      SUGAR_ADDED {
        ...NutrientFields
      }
      THIA {
        ...NutrientFields
      }
      TOCPHA {
        ...NutrientFields
      }
      VITA_RAE {
        ...NutrientFields
      }
      VITB12 {
        ...NutrientFields
      }
      VITB6A {
        ...NutrientFields
      }
      VITC {
        ...NutrientFields
      }
      VITD {
        ...NutrientFields
      }
      VITK1 {
        ...NutrientFields
      }
      WATER {
        ...NutrientFields
      }
      ZN {
        ...NutrientFields
      }
    }
  }
`;
