import * as React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import * as PlanificationSlice from 'src/modules/patients/patient-console/planifications/adapters/in/slicers/PlanificationSlice';

type MacroKey = 'carbsInPercentage' | 'proteinInPercentage' | 'fatInPercentage';
export type MacroPercents = { carbs: number; protein: number; fat: number };

type Props = {
  initial?: Partial<MacroPercents>;
  onChange?: (values: MacroPercents) => void;
  showSubmitButton?: boolean;
  onSubmit?: (values: MacroPercents) => void;
};

const clamp = (v: number, min = 0, max = 100) => Math.min(max, Math.max(min, v));
const num = (s: string) => (Number.isFinite(+s) ? +s : 0);

export default function MacroForm() {
  const dispatch = useDispatch();
  const planificationState = useSelector((state: ReduxStates) => state.planifications.planification);

  const total =
    planificationState.configuredMacros.carbsInPercentage +
    planificationState.configuredMacros.proteinInPercentage +
    planificationState.configuredMacros.fatInPercentage;

  const remaining = 100 - total;
  const over = total > 100;

  const handle = (k: MacroKey) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = { ...planificationState.configuredMacros, [k]: clamp(num(e.target.value.replace(',', '.'))) };
    dispatch(PlanificationSlice.modifyCalculatedMacros(next));
  };

  const field = (label: string, k: MacroKey) => ({
    label,
    value: planificationState.configuredMacros[k],
    onChange: handle(k),
    type: 'number' as const,
    inputProps: { min: 0, max: 100, step: 0.5 },
    fullWidth: true,
    InputProps: { endAdornment: <InputAdornment position="end">%</InputAdornment> },
    error: over,
    helperText: over ? 'La suma supera 100%' : ' ',
  });

  return (
    <Card variant="outlined" sx={{ maxWidth: 720 }}>
      <CardHeader title="Macronutrientes" subheader="Solo porcentajes. Debe sumar 100%." />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField {...field('Carbohidratos', 'carbsInPercentage')} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField {...field('Proteína', 'proteinInPercentage')} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField {...field('Grasas', 'fatInPercentage')} />
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography variant="body2" color={over ? 'error.main' : 'text.secondary'}>
                {over ? `Te pasaste por ${Math.abs(remaining).toFixed(1)}%.` : `Restante: ${remaining.toFixed(1)}%.`}
              </Typography>
              <Box>
                <LinearProgress variant="determinate" value={Math.min(100, total)} sx={{ height: 10, borderRadius: 5 }} />
                <Stack direction="row" justifyContent="space-between" sx={{ mt: 0.5 }}>
                  <Typography variant="caption">Carbs {planificationState.configuredMacros.carbsInPercentage}%</Typography>
                  <Typography variant="caption">Prot {planificationState.configuredMacros.proteinInPercentage}%</Typography>
                  <Typography variant="caption">Grasa {planificationState.configuredMacros.fatInPercentage}%</Typography>
                  <Typography variant="caption">Total {total.toFixed(1)}%</Typography>
                </Stack>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            {/* <Button variant="contained" size="large" fullWidth disabled={over || total !== 100} onClick={() => onSubmit?.(values)}>
                Siguiente paso
              </Button> */}
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
              El botón se habilita cuando la suma es exactamente 100%.
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
