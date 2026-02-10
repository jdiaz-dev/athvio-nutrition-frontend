import React, { ReactNode, useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import { useNutritionBuilder } from 'src/modules/nutrition-builder/adapters/out/NutritionBuilderActions';
import * as nutritionBuilderSlice from 'src/modules/nutrition-builder/adapters/in/slicers/NutritionBuilderSlice';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { Card, FormLabel } from '@mui/material';

import { ChangeEvent, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { NutriBuilderParamStatus } from 'src/shared/Consts';

type ParamStatus = { uuid: string; status: NutriBuilderParamStatus };
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

function DiseaseParameterList() {
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

export default DiseaseParameterList;
