import React from 'react';
import { TextField } from '@mui/material';
import * as nutritionBuilderSlice from 'src/modules/nutrition-builder/adapters/in/slicers/NutritionBuilderSlice';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';

function PatientMacros() {
  const nutritionBuilderState = useSelector((state: ReduxStates) => state.nutritionBuilder);

  return (
    <div>
      <TextField
        id="outlined-number"
        label="Calories"
        type="number"
        value={nutritionBuilderState.macros.calories}
        onChange={(event) => nutritionBuilderSlice.updateCalories(parseInt(event.target.value))}
      />
    </div>
  );
}

export default PatientMacros;
