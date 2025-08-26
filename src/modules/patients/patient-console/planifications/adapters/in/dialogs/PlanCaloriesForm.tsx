import * as React from 'react';
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export type PatientPlanData = {
  weightKg?: number;
  heightM?: number;
  age?: number;
  sex: 'male' | 'female' | 'unspecified';
  activityFactor: number;
  planCalories: number;
};

type Props = {
  initial?: PatientPlanData;
  onChange?: (v: PatientPlanData) => void;
};

const safeNum = (v: string) => (Number.isFinite(+v) ? +v : undefined);

export default function PlanCaloriesForm({ initial, onChange }: Props) {
  const [openPatient, setOpenPatient] = React.useState(true);
  const [data, setData] = React.useState<PatientPlanData>({
    weightKg: initial?.weightKg,
    heightM: initial?.heightM,
    age: initial?.age,
    sex: initial?.sex ?? 'unspecified',
    activityFactor: initial?.activityFactor ?? 1.55,
    planCalories: initial?.planCalories ?? 2000,
  });

  const update = (patch: Partial<PatientPlanData>) => {
    const next = { ...data, ...patch };
    setData(next);
    onChange?.(next);
  };

  return (
    <Card variant="outlined">
      <CardHeader title="Calorías del plan" />
      <CardContent>
        <Stack spacing={2}>
          <Alert severity="info" variant="outlined">
            Modificaciones aquí sólo sirven como simulación, pero no se guardan en el expediente.
          </Alert>

          {/* Ver datos del paciente */}
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle2">Ver datos del paciente</Typography>
            <IconButton size="small" onClick={() => setOpenPatient((o) => !o)}>
              <ExpandMoreIcon
                sx={{
                  transform: openPatient ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform .2s',
                }}
              />
            </IconButton>
          </Stack>

          <Collapse in={openPatient} unmountOnExit>
            <Box sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Peso"
                    value={data.weightKg ?? ''}
                    onChange={(e) => update({ weightKg: safeNum(e.target.value) })}
                    type="number"
                    fullWidth
                    inputProps={{ min: 0, step: 0.1 }}
                    InputProps={{ endAdornment: <InputAdornment position="end">kg.</InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Estatura"
                    value={data.heightM ?? ''}
                    onChange={(e) => update({ heightM: safeNum(e.target.value) })}
                    type="number"
                    fullWidth
                    inputProps={{ min: 0, step: 0.01 }}
                    InputProps={{ endAdornment: <InputAdornment position="end">mts.</InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Edad"
                    value={data.age ?? ''}
                    onChange={(e) => update({ age: safeNum(e.target.value) })}
                    type="number"
                    fullWidth
                    inputProps={{ min: 0, step: 1 }}
                    InputProps={{ endAdornment: <InputAdornment position="end">Años</InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="sexo-lbl">Género</InputLabel>
                    <Select
                      labelId="sexo-lbl"
                      label="Género"
                      value={data.sex}
                      onChange={(e) => update({ sex: e.target.value as PatientPlanData['sex'] })}
                    >
                      <MenuItem value="unspecified">unspecified</MenuItem>
                      <MenuItem value="male">Masculino</MenuItem>
                      <MenuItem value="female">Femenino</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </Collapse>

          <Divider />

          {/* GEB / GET sólo UI (sin fórmula) */}
          <Stack spacing={1}>
            <Typography variant="body2">
              GEB: <b>— kcal</b>
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2" sx={{ minWidth: 160 }}>
                Factor de actividad física:
              </Typography>

              {/* interruptor “Intensa” a modo de atajo */}
              <Tooltip title="Atajo: marca 'Intensa' = 1.78">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Switch
                    checked={data.activityFactor === 1.78}
                    onChange={(e) => update({ activityFactor: e.target.checked ? 1.78 : 1.55 })}
                    color="primary"
                    inputProps={{ 'aria-label': 'Intensa' }}
                  />
                  <Typography variant="body2">Intensa</Typography>
                </Stack>
              </Tooltip>

              <TextField
                value={data.activityFactor}
                onChange={(e) => update({ activityFactor: Number(e.target.value) || 1.55 })}
                type="number"
                size="small"
                inputProps={{ step: 0.01, min: 1 }}
                sx={{ width: 110, ml: 'auto' }}
              />
            </Stack>

            <Typography variant="body2">
              Calorías totales (GET): <b>— kcal</b>
            </Typography>
          </Stack>

          <TextField
            label="Calorías para tu plan"
            value={data.planCalories}
            onChange={(e) => update({ planCalories: Number(e.target.value) || 0 })}
            type="number"
            inputProps={{ min: 0, step: 10 }}
            fullWidth
            InputProps={{ endAdornment: <InputAdornment position="end">kcal</InputAdornment> }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
