import React, { ReactNode, useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import { useNutritionBuilder } from 'src/modules/nutrition-builder/adapters/out/NutritionBuilderActions';
import * as nutritionBuilderSlice from 'src/modules/nutrition-builder/adapters/in/slicers/NutritionBuilderSlice';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { Card, FormLabel } from '@mui/material';
import CheckboxController from 'src/modules/patients/patient-console/patient-plans/adapters/in/dialogs/PatientPlansGeneratorDialog/CheckboxController';

function FormControlContainer({ children }: { children: ReactNode }) {
  return <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'left', border: '1px solid green' }}>{children}</div>;
}

function ParameterList() {
  const nutritionBuilderState = useSelector((state: ReduxStates) => state.nutritionBuilder);
  const { getNutritionBuilderParameters } = useNutritionBuilder();

  useEffect(() => {
    const fetchParameters = async () => {
      await getNutritionBuilderParameters();
    };
    fetchParameters();
  }, []);

  return (
    <>
      <Card>
        <FormGroup>
          <FormLabel color="primary">Causa raiz de la enfermedad</FormLabel>
          <FormControlContainer>
            {nutritionBuilderState.diseaseCauses.map((item) => (
              <CheckboxController item={item} reducer={nutritionBuilderSlice.updateDiseaseCause} />
            ))}
          </FormControlContainer>
        </FormGroup>
      </Card>

      <Card>
        <FormGroup>
          <FormLabel color="primary">Preferencias nutritionales</FormLabel>
          <FormControlContainer>
            {nutritionBuilderState.nutritionalPreferences.map((item) => (
              <CheckboxController item={item} reducer={nutritionBuilderSlice.updateNutritionalPreference} />
            ))}
          </FormControlContainer>
        </FormGroup>
      </Card>

      <Card>
        <FormGroup>
          <FormLabel color="primary">Enfermedades</FormLabel>
          <FormControlContainer>
            {nutritionBuilderState.diseases.map((item) => (
              <CheckboxController item={item} reducer={nutritionBuilderSlice.updateDisease} />
            ))}
          </FormControlContainer>
        </FormGroup>
      </Card>
    </>
  );
}

export default ParameterList;
