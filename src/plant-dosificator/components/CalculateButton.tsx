import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CalculateIcon from '@mui/icons-material/Calculate';

interface CalculateButtonProps {
  disabled: boolean;
  disabledReason?: string;
  onCalculate: () => void;
}

/**
 * Section 3: triggers the dosage calculation for the current selection.
 */
const CalculateButton: React.FC<CalculateButtonProps> = ({
  disabled,
  disabledReason,
  onCalculate,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <Button
        variant="contained"
        size="large"
        color="primary"
        startIcon={<CalculateIcon />}
        disabled={disabled}
        onClick={onCalculate}
        sx={{ px: 4, py: 1.25, borderRadius: 3 }}
      >
        Calcular dosificación
      </Button>
      {disabled && disabledReason && (
        <Alert severity="info" sx={{ maxWidth: 480 }}>
          {disabledReason}
        </Alert>
      )}
    </Box>
  );
};

export default CalculateButton;
