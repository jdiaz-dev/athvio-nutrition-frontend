import React from 'react';
import { TextField, FormHelperText } from '@mui/material';
import * as nutritionBuilderSlice from 'src/modules/nutrition-builder/adapters/in/slicers/NutritionBuilderSlice';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import AssigmentStartDate from 'src/shared/components/AssigmentStartDate';
import { Dayjs } from 'dayjs';

interface ValidationErrors {
  startDate: string;
  totalDays: string;
  mealsByDay: string;
  calories: string;
  diseaseCauses: string;
  nutritionalPreferences: string;
  diseases: string;
}

interface GeneralPatientPlanDefinitionProps {
  setStartDate: (date: Dayjs) => void;
  validationErrors: ValidationErrors;
  setValidationErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>;
}

function GeneralPatientPlanDefinition({ setStartDate, validationErrors, setValidationErrors }: GeneralPatientPlanDefinitionProps) {
  const nutritionBuilderState = useSelector((state: ReduxStates) => state.nutritionBuilder);
  const dispatch = useDispatch();

  const datePickedHandler = (newDate: Dayjs | null) => {
    setStartDate(newDate as Dayjs);
    if (newDate) {
      setValidationErrors((prev) => ({ ...prev, startDate: '' }));
    }
  };

  const handleTotalDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    dispatch(nutritionBuilderSlice.updateTotalDays(value));

    if (value > 0 && value <= 7) {
      setValidationErrors((prev) => ({ ...prev, totalDays: '' }));
    }
  };

  const handleMealsByDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    dispatch(nutritionBuilderSlice.updateMealsByDay(value));

    if (value > 3) {
      setValidationErrors((prev) => ({ ...prev, mealsByDay: '' }));
    }
  };

  const handleCaloriesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    dispatch(nutritionBuilderSlice.updateCalories(value));

    if (value > 0 && value <= 10000) {
      setValidationErrors((prev) => ({ ...prev, calories: '' }));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex' }}>
        <div>
          <AssigmentStartDate datePickedHandler={datePickedHandler} />
          {validationErrors.startDate && (
            <FormHelperText error style={{ marginLeft: '14px', marginTop: '4px' }}>
              {validationErrors.startDate}
            </FormHelperText>
          )}
        </div>
        <div style={{ width: '55%', display: 'flex', paddingTop: '30px', justifyContent: 'space-around' }}>
          <div style={{ width: '30%' }}>
            <TextField
              id="outlined-number"
              label="Dias totales"
              type="number"
              defaultValue={nutritionBuilderState.totalDays}
              onChange={handleTotalDaysChange}
              error={!!validationErrors.totalDays}
              inputProps={{ min: 1, max: 7 }}
              fullWidth
            />
            {validationErrors.totalDays && <FormHelperText error>{validationErrors.totalDays}</FormHelperText>}
          </div>
          <div style={{ width: '30%' }}>
            <TextField
              id="outlined-number"
              label="Comidas por dia"
              type="number"
              defaultValue={nutritionBuilderState.mealsByDay}
              onChange={handleMealsByDayChange}
              error={!!validationErrors.mealsByDay}
              inputProps={{ min: 1, max: 3 }}
              fullWidth
            />
            {validationErrors.mealsByDay && <FormHelperText error>{validationErrors.mealsByDay}</FormHelperText>}
          </div>
          <div style={{ width: '30%' }}>
            <TextField
              id="outlined-number"
              label="Calorias"
              type="number"
              defaultValue={nutritionBuilderState.macros.calories}
              onChange={handleCaloriesChange}
              error={!!validationErrors.calories}
              inputProps={{ min: 1, max: 10000 }}
              fullWidth
            />
            {validationErrors.calories && <FormHelperText error>{validationErrors.calories}</FormHelperText>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralPatientPlanDefinition;
