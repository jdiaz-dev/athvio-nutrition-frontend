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

interface DiseaseParameterListProps {
  validationErrors: ValidationErrors;
  setValidationErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>;
}

function CheckboxController({
  item,
  reducer,
  onCheckChange,
}: {
  item: { uuid: string; spanishName: string };
  reducer: (param: ParamStatus) => AnyAction;
  onCheckChange?: () => void;
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

    // Notify parent component about the change
    if (onCheckChange) {
      onCheckChange();
    }
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

function DiseaseParameterList({ validationErrors, setValidationErrors }: DiseaseParameterListProps) {
  const nutritionBuilderState = useSelector((state: ReduxStates) => state.nutritionBuilder);
  const { getNutritionBuilderParameters } = useNutritionBuilder();

  useEffect(() => {
    const fetchParameters = async () => {
      await getNutritionBuilderParameters();
    };
    fetchParameters();
  }, []);

  const handleDiseaseCauseChange = () => {
    const hasSelectedDiseaseCause = nutritionBuilderState.diseaseCauses.some((item) => item.status === NutriBuilderParamStatus.SELECTED);
    if (hasSelectedDiseaseCause && validationErrors.diseaseCauses) {
      setValidationErrors((prev) => ({ ...prev, diseaseCauses: '' }));
    }
  };

  const handleNutritionalPreferenceChange = () => {
    const hasSelectedNutritionalPreference = nutritionBuilderState.nutritionalPreferences.some(
      (item) => item.status === NutriBuilderParamStatus.SELECTED,
    );
    if (hasSelectedNutritionalPreference && validationErrors.nutritionalPreferences) {
      setValidationErrors((prev) => ({ ...prev, nutritionalPreferences: '' }));
    }
  };

  const handleDiseaseChange = () => {
    const hasSelectedDisease = nutritionBuilderState.diseases.some((item) => item.status === NutriBuilderParamStatus.SELECTED);
    if (hasSelectedDisease && validationErrors.diseases) {
      setValidationErrors((prev) => ({ ...prev, diseases: '' }));
    }
  };

  return (
    <>
      <Card style={{ marginTop: '16px', marginBottom: '16px' }}>
        <FormGroup>
          <FormLabel color="primary">Causa raiz de la enfermedad</FormLabel>
          <FormControlContainer>
            {nutritionBuilderState.diseaseCauses.map((item) => (
              <CheckboxController
                key={item.uuid}
                item={item}
                reducer={nutritionBuilderSlice.updateDiseaseCause}
                onCheckChange={handleDiseaseCauseChange}
              />
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
          <FormLabel color="primary">Preferencias nutritionales</FormLabel>
          <FormControlContainer>
            {nutritionBuilderState.nutritionalPreferences.map((item) => (
              <CheckboxController
                key={item.uuid}
                item={item}
                reducer={nutritionBuilderSlice.updateNutritionalPreference}
                onCheckChange={handleNutritionalPreferenceChange}
              />
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
          <FormLabel color="primary">Enfermedades</FormLabel>
          <FormControlContainer>
            {nutritionBuilderState.diseases.map((item) => (
              <CheckboxController
                key={item.uuid}
                item={item}
                reducer={nutritionBuilderSlice.updateDisease}
                onCheckChange={handleDiseaseChange}
              />
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
