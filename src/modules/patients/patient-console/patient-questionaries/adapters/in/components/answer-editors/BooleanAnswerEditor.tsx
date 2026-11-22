import React from 'react';
import { MenuItem, Select } from '@mui/material';
import { PrimitiveAnswer } from 'src/modules/patients/patient-console/patient-questionaries/adapters/out/PatientQuestionary.d';
import {
  BOOLEAN_OPTIONS,
  placeholderSpan,
} from 'src/modules/patients/patient-console/patient-questionaries/adapters/in/components/answer-editors/answerEditorHelpers';

function BooleanAnswerEditor({
  value,
  placeHolder,
  onChange,
}: {
  value: PrimitiveAnswer | undefined;
  placeHolder: string;
  onChange: (value: boolean) => void;
}) {
  const normalized = value === undefined ? '' : String(value).toLowerCase();
  const valid = BOOLEAN_OPTIONS.some((o) => o.value === normalized) ? normalized : '';

  return (
    <Select
      displayEmpty
      variant="standard"
      fullWidth
      value={valid}
      onChange={(e) => onChange(e.target.value === 'true')}
      renderValue={(v) => (v ? BOOLEAN_OPTIONS.find((o) => o.value === v)?.label : placeholderSpan(placeHolder))}
    >
      {BOOLEAN_OPTIONS.map((o) => (
        <MenuItem key={o.value} value={o.value}>
          {o.label}
        </MenuItem>
      ))}
    </Select>
  );
}

export default BooleanAnswerEditor;
