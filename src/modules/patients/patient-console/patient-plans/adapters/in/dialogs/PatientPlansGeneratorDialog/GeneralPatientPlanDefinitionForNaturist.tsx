import React from 'react';
import { TextField } from '@mui/material';
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
  totalDays: any;
  mealsByDay: any;
  datePickedHandler: (date: Dayjs | null) => void;
  handleTotalDaysChange: (value: any) => void;
  handleMealsByDayChange: (value: any) => void;
}

function GeneralPatientPlanDefinitionForNaturist({
  datePickedHandler,
  handleTotalDaysChange,
  handleMealsByDayChange,
  totalDays,
  mealsByDay,
}: GeneralPatientPlanDefinitionProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex' }}>
        <div>
          <AssigmentStartDate datePickedHandler={datePickedHandler} />
        </div>
        <div style={{ width: '55%', display: 'flex', paddingTop: '30px', justifyContent: 'space-around' }}>
          <div style={{ width: '30%' }}>
            <TextField
              id="outlined-number"
              label="Dias totales"
              type="number"
              defaultValue={totalDays}
              onChange={handleTotalDaysChange}
              inputProps={{ min: 1, max: 7 }}
              fullWidth
            />
          </div>
          <div style={{ width: '30%' }}>
            <TextField
              id="outlined-number"
              label="Comidas por dia"
              type="number"
              defaultValue={mealsByDay}
              onChange={handleMealsByDayChange}
              inputProps={{ min: 1, max: 3 }}
              fullWidth
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralPatientPlanDefinitionForNaturist;
