import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import GroupsIcon from '@mui/icons-material/Groups';
import type { DosageType } from '../types/plant.types';
import ChildrenFormulaTable from './ChildrenFormulaTable';
import type { ChildFormulaInput } from '../types/plant.types';

interface DosageTypeSelectorProps {
  dosageType: DosageType;
  onChangeDosageType: (value: DosageType) => void;
  childInput: ChildFormulaInput;
  onChangeChildInput: (value: ChildFormulaInput) => void;
}

const OPTIONS: { value: DosageType; label: string }[] = [
  { value: 'adultoPromedio', label: 'Dosificación adulto promedio' },
  { value: 'ninos', label: 'Dosificación niños' },
  { value: 'adultoMayor', label: 'Dosificación adulto mayor' },
];

/**
 * Section 2: horizontal radio group to choose the target population.
 * When "Dosificación niños" is selected, renders the pediatric formula
 * table below it (Fried / Young / Clark).
 */
const DosageTypeSelector: React.FC<DosageTypeSelectorProps> = ({
  dosageType,
  onChangeDosageType,
  childInput,
  onChangeChildInput,
}) => {
  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <GroupsIcon color="primary" />
        <Typography variant="h6" component="h2">
          Tipo de dosificación
        </Typography>
      </Box>

      <RadioGroup
        row
        value={dosageType}
        onChange={(event) => onChangeDosageType(event.target.value as DosageType)}
        sx={{ gap: 1, flexWrap: 'wrap' }}
      >
        {OPTIONS.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>

      {dosageType === 'ninos' && (
        <Box sx={{ mt: 3 }}>
          <ChildrenFormulaTable childInput={childInput} onChangeChildInput={onChangeChildInput} />
        </Box>
      )}
    </Paper>
  );
};

export default DosageTypeSelector;
