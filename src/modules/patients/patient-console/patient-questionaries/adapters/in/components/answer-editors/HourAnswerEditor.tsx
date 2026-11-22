import React from 'react';
import { Box, MenuItem, Select } from '@mui/material';
import {
  HOURS,
  MINUTES,
  placeholderSpan,
} from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/answer-editors/answerEditorHelpers';

const MENU_PROPS = { PaperProps: { style: { maxHeight: 240 } } };

function HourAnswerEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [h = '', m = ''] = (value ?? '').split(':');
  const hour = HOURS.includes(h) ? h : '';
  const minute = MINUTES.includes(m) ? m : '';
  const update = (nextHour: string, nextMinute: string) => onChange(`${nextHour || '00'}:${nextMinute || '00'}`);

  return (
    <Box style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Select
        displayEmpty
        variant="standard"
        value={hour}
        onChange={(e) => update(e.target.value as string, minute)}
        renderValue={(v) => (v ? v : placeholderSpan('HH'))}
        MenuProps={MENU_PROPS}
        style={{ minWidth: 60 }}
      >
        {HOURS.map((hh) => (
          <MenuItem key={hh} value={hh}>
            {hh}
          </MenuItem>
        ))}
      </Select>
      <span>:</span>
      <Select
        displayEmpty
        variant="standard"
        value={minute}
        onChange={(e) => update(hour, e.target.value as string)}
        renderValue={(v) => (v ? v : placeholderSpan('mm'))}
        MenuProps={MENU_PROPS}
        style={{ minWidth: 60 }}
      >
        {MINUTES.map((mm) => (
          <MenuItem key={mm} value={mm}>
            {mm}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

export default HourAnswerEditor;
