import React, { ReactNode, useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import { useNutritionBuilder } from 'src/modules/nutrition-builder/adapters/out/NutritionBuilderActions';
import * as nutritionBuilderSlice from 'src/modules/nutrition-builder/adapters/in/slicers/NutritionBuilderSlice';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { Card, FormLabel, FormHelperText } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { NutriBuilderParamStatus } from 'src/shared/Consts';

type ParamStatus = { uuid: string; status: NutriBuilderParamStatus };

interface ValidationErrors {
  startDate: string;
  totalDays: string;
  mealsByDay: string;
  calories: string;
  diseaseCauses: string;
  nutritionalPreferences: string;
  diseases: string;
}

function CheckboxController({
  item,
  reducer,
}: {
  item: { uuid: string; spanishName: string };
  reducer: (param: ParamStatus) => AnyAction;
}) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(reducer({ uuid: event.target.defaultValue, status: NutriBuilderParamStatus.SELECTED }));
    } else {
      dispatch(reducer({ uuid: event.target.defaultValue, status: NutriBuilderParamStatus.UNSELECTED }));
    }
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      style={{ width: '13%' }}
      control={<Checkbox checked={checked} onChange={handleChange} />}
      label={item.spanishName}
      value={item.uuid}
    />
  );
}

function FormControlContainer({ children }: { children: ReactNode }) {
  return <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'left', border: '1px solid green' }}>{children}</div>;
}

function DiseaseParameterList({ validationErrors }: { validationErrors: ValidationErrors }) {
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
      <Card style={{ marginTop: '16px', marginBottom: '16px' }}>
        <FormGroup>
          <FormLabel color="primary" error={!!validationErrors.diseaseCauses}>
            Causa raiz de la enfermedad
          </FormLabel>
          <FormControlContainer>
            {nutritionBuilderState.diseaseCauses.map((item) => (
              <CheckboxController key={item.uuid} item={item} reducer={nutritionBuilderSlice.updateDiseaseCause} />
            ))}
          </FormControlContainer>
          {validationErrors.diseaseCauses && (
            <FormHelperText error style={{ marginLeft: '14px', marginTop: '4px' }}>
              {validationErrors.diseaseCauses}
            </FormHelperText>
          )}
        </FormGroup>
      </Card>

      <Card style={{ marginTop: '16px', marginBottom: '16px' }}>
        <FormGroup>
          <FormLabel color="primary" error={!!validationErrors.nutritionalPreferences}>
            Preferencias nutritionales
          </FormLabel>
          <FormControlContainer>
            {nutritionBuilderState.nutritionalPreferences.map((item) => (
              <CheckboxController key={item.uuid} item={item} reducer={nutritionBuilderSlice.updateNutritionalPreference} />
            ))}
          </FormControlContainer>
          {validationErrors.nutritionalPreferences && (
            <FormHelperText error style={{ marginLeft: '14px', marginTop: '4px' }}>
              {validationErrors.nutritionalPreferences}
            </FormHelperText>
          )}
        </FormGroup>
      </Card>

      <Card style={{ marginTop: '16px', marginBottom: '16px' }}>
        <FormGroup>
          <FormLabel color="primary" error={!!validationErrors.diseases}>
            Enfermedades
          </FormLabel>
          <FormControlContainer>
            {nutritionBuilderState.diseases.map((item) => (
              <CheckboxController key={item.uuid} item={item} reducer={nutritionBuilderSlice.updateDisease} />
            ))}
          </FormControlContainer>
          {validationErrors.diseases && (
            <FormHelperText error style={{ marginLeft: '14px', marginTop: '4px' }}>
              {validationErrors.diseases}
            </FormHelperText>
          )}
        </FormGroup>
      </Card>
    </>
  );
}

export default DiseaseParameterList;