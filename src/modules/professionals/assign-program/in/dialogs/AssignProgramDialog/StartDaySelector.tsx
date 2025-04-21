import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ReduxStates } from 'src/shared/types/types';
import { useDispatch, useSelector } from 'react-redux';
import * as AssignProgramSlice from 'src/modules/professionals/assign-program/in/slicers/AssignProgramSlice';
import { useTranslation } from 'react-i18next';

function StartDaySelector() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const plansState = useSelector((state: ReduxStates) => state.programs.program.data.plans);
  const assignProgramState = useSelector((state: ReduxStates) => state.assignProgram);

  const selectDayHandler = (event: SelectChangeEvent<number>) => {
    dispatch(AssignProgramSlice.assignStartingDay(event.target.value as unknown as number));
  };

  return (
    <>
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{t('programsModule.titles.startingDay')}</div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <Select<number>
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={assignProgramState.startingDay}
            label="day"
            onChange={selectDayHandler}
          >
            {plansState.map(({ day }, index) => (
              <MenuItem key={index} value={day}>
                Day {day}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

export default StartDaySelector;
