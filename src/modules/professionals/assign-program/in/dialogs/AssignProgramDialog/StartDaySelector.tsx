import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ReduxStates } from 'src/shared/types/types';
import { useDispatch, useSelector } from 'react-redux';
import * as AssignProgramSlice from 'src/modules/professionals/assign-program/in/slicers/AssignProgramSlice';

function StartDaySelector() {
  const dispatch = useDispatch();

  const plansState = useSelector((state: ReduxStates) => state.programs.program.data.plans);
  const assignProgramState = useSelector((state: ReduxStates) => state.assignProgram);

  const [highestPlanDay] = useState<number>(plansState[plansState.length - 1].day);
  const selectDayHandler = (event: SelectChangeEvent<number>) => {
    dispatch(AssignProgramSlice.assignStartingDay(event.target.value as unknown as number));
  };

  const days: number[] = [];
  for (let x = 1; x <= highestPlanDay; x++) {
    days.push(x);
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Starting day</InputLabel>
        <Select<number>
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={assignProgramState.startingDay}
          label="day"
          onChange={selectDayHandler}
        >
          {days.map((day, index) => (
            <MenuItem key={index} value={day}>
              Day {day}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default StartDaySelector;
