import React from 'react';
import { TextField } from '@mui/material';
import * as nutritionBuilderSlice from 'src/modules/nutrition-builder/adapters/in/slicers/NutritionBuilderSlice';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import AssigmentStartDate from 'src/shared/components/AssigmentStartDate';
import { Dayjs } from 'dayjs';

function GeneralPatientPlanDefinition({ setStartDate }: { setStartDate: (date: Dayjs) => void }) {
  const nutritionBuilderState = useSelector((state: ReduxStates) => state.nutritionBuilder);

  const datePickedHandler = (newDate: Dayjs | null) => {
    setStartDate(newDate as Dayjs);
  };
  return (
    <div style={{ display: 'flex' }}>
      <AssigmentStartDate datePickedHandler={datePickedHandler} />
      <div style={{ width: '55%', display: 'flex', paddingTop: '2.5%', justifyContent: 'space-around' }}>
        <TextField
          id="outlined-number"
          label="Dias totales"
          type="number"
          defaultValue={nutritionBuilderState.totalDays}
          onChange={(event) => nutritionBuilderSlice.updateTotalDays(parseInt(event.target.value))}
        />
        <TextField
          id="outlined-number"
          label="Comidas por dia"
          type="number"
          defaultValue={nutritionBuilderState.mealsByDay}
          onChange={(event) => nutritionBuilderSlice.updateMealsByDay(parseInt(event.target.value))}
        />
        <TextField
          id="outlined-number"
          label="Calorias"
          type="number"
          defaultValue={nutritionBuilderState.macros.calories}
          onChange={(event) => nutritionBuilderSlice.updateCalories(parseInt(event.target.value))}
        />
      </div>
    </div>
  );
}

export default GeneralPatientPlanDefinition;
