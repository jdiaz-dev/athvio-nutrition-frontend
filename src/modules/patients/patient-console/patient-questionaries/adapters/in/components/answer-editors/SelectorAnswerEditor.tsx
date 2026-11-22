import React from 'react';
import { MenuItem, Select } from '@mui/material';
import { placeholderSpan } from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/answer-editors/answerEditorHelpers';

function SelectorAnswerEditor({
  value,
  options,
  placeHolder,
  onChange,
}: {
  value: string;
  options: { uuid: string; name: string }[];
  placeHolder: string;
  onChange: (value: string) => void;
}) {
  const valid = options.some((o) => o.name === value) ? value : '';

  return (
    <Select
      displayEmpty
      variant="standard"
      fullWidth
      value={valid}
      onChange={(e) => onChange(e.target.value as string)}
      renderValue={(v) => (v ? v : placeholderSpan(placeHolder))}
    >
      {options.map((o) => (
        <MenuItem key={o.uuid} value={o.name}>
          {o.name}
        </MenuItem>
      ))}
    </Select>
  );
}

export default SelectorAnswerEditor;
