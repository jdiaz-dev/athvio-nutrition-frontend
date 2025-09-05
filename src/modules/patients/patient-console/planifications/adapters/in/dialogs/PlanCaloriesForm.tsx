import * as React from 'react';
import {
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
  Popover,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
  CardActionArea,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { PatientInformation } from 'src/modules/patients/patient-console/planifications/helpers/planifications';
import * as PlanificationSlice from 'src/modules/patients/patient-console/planifications/adapters/in/slicers/PlanificationSlice';
import { useDispatch } from 'react-redux';

export type PatientPlanData = {
  weightKg?: number;
  heightM?: number;
  age?: number;
  sex: 'male' | 'female' | 'unspecified';
  activityFactor: number;
  planCalories: number;
};

type Props = {
  patientInformation: PatientInformation & { calories: number };
};

type ActivityKey = 'sedentary' | 'light' | 'moderate' | 'intense';

type ActivityOption = {
  key: ActivityKey;
  title: string;
  desc: string;
  factors: { mujeres: number; hombres: number };
};

const AF_OPTIONS: ActivityOption[] = [
  { key: 'sedentary', title: 'Sedentaria', desc: 'No realiza actividad física', factors: { mujeres: 1.2, hombres: 1.2 } },
  { key: 'light', title: 'Ligera', desc: '3 horas semanales de actividad física', factors: { mujeres: 1.56, hombres: 1.65 } },
  { key: 'moderate', title: 'Moderada', desc: '6 horas semanales de actividad física', factors: { mujeres: 1.64, hombres: 1.78 } },
  { key: 'intense', title: 'Intensa', desc: '4 a 5 horas diarias de actividad física', factors: { mujeres: 1.82, hombres: 2.1 } },
];

const getFactorForGender = (gender: 'male' | 'female', opt: ActivityOption) =>
  gender === 'male' ? opt.factors.hombres : opt.factors.mujeres;

export default function PlanCaloriesForm({ patientInformation }: Props) {
  const [openPatient, setOpenPatient] = React.useState(true);
  const dispatch = useDispatch();

  // selected option + derived factor
  const defaultOption = AF_OPTIONS.find((o) => o.key === 'intense')!;
  const [selected, setSelected] = React.useState<ActivityOption>(defaultOption);
  const [basalMetabolism, setBasalMetabolism] = React.useState<number>(0);
  const [totalCalories, setTotalCalories] = React.useState<number>(0);

  // popover anchor
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const popOpen = Boolean(anchorEl);
  const id = popOpen ? 'activity-popover' : undefined;

  const factor = getFactorForGender((patientInformation.gender as 'male' | 'female') ?? 'female', selected);

  React.useEffect(() => {
    const withGender = patientInformation.gender === 'male' ? +5 : -161;
    const calculateBasalMetabolism =
      10 * patientInformation.weight + 6.25 * patientInformation.height - 5 * patientInformation.age + withGender;

    setBasalMetabolism(parseInt(calculateBasalMetabolism.toFixed(0)));
    setTotalCalories(parseInt((basalMetabolism * patientInformation.physicActivityFactor).toFixed(0)));
  }, [patientInformation]);
  return (
    <Card variant="outlined">
      <CardHeader title="Calorías del plan" />
      <CardContent>
        <Stack spacing={2}>
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
                    value={patientInformation.weight}
                    type="number"
                    fullWidth
                    inputProps={{ min: 0, step: 0.1 }}
                    InputProps={{ endAdornment: <InputAdornment position="end">kg.</InputAdornment> }}
                    onChange={(e) => {
                      dispatch(PlanificationSlice.modifyWeight(parseFloat(e.target.value)));
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Estatura"
                    value={patientInformation.height}
                    type="number"
                    fullWidth
                    inputProps={{ min: 0 }}
                    InputProps={{ endAdornment: <InputAdornment position="end">cm.</InputAdornment> }}
                    onChange={(e) => {
                      dispatch(PlanificationSlice.modifyHeight(parseFloat(e.target.value)));
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Edad"
                    value={patientInformation.age}
                    type="number"
                    fullWidth
                    inputProps={{ min: 0, step: 1 }}
                    InputProps={{ endAdornment: <InputAdornment position="end">Años</InputAdornment> }}
                    onChange={(e) => {
                      dispatch(PlanificationSlice.modifyAge(parseInt(e.target.value)));
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="sexo-lbl">Género</InputLabel>
                    <Select
                      labelId="sexo-lbl"
                      label="Género"
                      value={patientInformation.gender}
                      onChange={(e) => {
                        dispatch(PlanificationSlice.modifyGender(e.target.value));
                      }}
                    >
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
              Gasto Energético Basal (GEB): <b>{basalMetabolism} kcal</b>
            </Typography>

            {/* --- Activity Factor row with popover trigger --- */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2" sx={{ minWidth: 190 }}>
                Factor de actividad física:
              </Typography>

              <Tooltip title="Cambiar nivel de actividad">
                <Stack
                  role="button"
                  tabIndex={0}
                  onClick={(e) => setAnchorEl(e.currentTarget as HTMLElement)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setAnchorEl(e.currentTarget as HTMLElement)}
                  sx={(theme) => ({
                    'px': 1.25,
                    'py': 0.5,
                    'borderRadius': 2,
                    'border': `1px solid ${theme.palette.divider}`,
                    'cursor': 'pointer',
                    'userSelect': 'none',
                    '&:hover': { backgroundColor: theme.palette.action.hover },
                  })}
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <Typography variant="body2" fontWeight={600}>
                    {selected.title}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.7 }}>
                    • {patientInformation.physicActivityFactor.toFixed(2)}
                  </Typography>
                </Stack>
              </Tooltip>

              <Popover
                id={id}
                open={popOpen}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                PaperProps={{ sx: { p: 2, width: 520, maxWidth: '90vw' } }}
              >
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                  Selecciona tu nivel de factor de actividad física:
                </Typography>

                <Grid container spacing={1.5}>
                  {AF_OPTIONS.map((option) => {
                    const isSelected = option.key === selected.key;
                    const factorValue = getFactorForGender((patientInformation.gender as 'male' | 'female') ?? 'female', option);

                    return (
                      <Grid key={option.key} item xs={12} sm={6}>
                        <Card
                          variant="outlined"
                          sx={{
                            borderColor: isSelected ? 'primary.main' : 'divider',
                            boxShadow: isSelected ? 3 : 0,
                          }}
                        >
                          <CardActionArea
                            onClick={() => {
                              setSelected(option);
                              dispatch(
                                PlanificationSlice.modifyActivityFactor({
                                  physicActivityFactor: factorValue,
                                  physicActivityName: option.key,
                                }),
                              );
                              setAnchorEl(null);
                            }}
                          >
                            <CardContent>
                              <Stack direction="row" alignItems="start" spacing={1}>
                                <Box sx={{ flexGrow: 1 }}>
                                  <Typography variant="subtitle1">{option.title}</Typography>
                                  <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
                                    {option.desc}
                                  </Typography>
                                  <Typography variant="caption" sx={{ display: 'block' }}>
                                    Mujeres: <b>{option.factors.mujeres}</b> &nbsp;|&nbsp; Hombres: <b>{option.factors.hombres}</b>
                                  </Typography>
                                </Box>
                                {isSelected && <CheckCircleRoundedIcon color="primary" fontSize="small" />}
                              </Stack>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Popover>
            </Stack>

            <Typography variant="body2">
              Calorías totales (GET): <b>{totalCalories} kcal</b>
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
