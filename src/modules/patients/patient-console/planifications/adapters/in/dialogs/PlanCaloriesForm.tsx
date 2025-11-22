import React, { useEffect, useState } from 'react';
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
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as PlanificationSlice from 'src/modules/patients/patient-console/planifications/adapters/in/slicers/PlanificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { Case, FormulaGroup } from 'src/modules/backoffice/formulas/types/formula';
import PhysicActivityFactor from './PhysicActivityFactor';

enum FomulaAutors {
  MIFFLIN = 'MIFFLIN',
  HARRIS = 'HARRIS',
  OWEN = 'OWEN',
  TINSLEY = 'TINSLEY',
}

export default function PlanCaloriesForm({ selectedFormulaGroup }: { selectedFormulaGroup: FormulaGroup | null }) {
  const dispatch = useDispatch();
  const planificationState = useSelector((state: ReduxStates) => state.planifications.planification);
  const [openPatient, setOpenPatient] = useState(true);

  useEffect(() => {
    const coefficentAndConstants = selectedFormulaGroup?.cases.find((c) => c.case === planificationState.patientInformation.gender) as Case;
    const { coefficients, constants } = coefficentAndConstants;

    let calculateBasalMetabolism: number;

    if (
      selectedFormulaGroup?.spanishFormulaName === FomulaAutors.MIFFLIN ||
      selectedFormulaGroup?.spanishFormulaName === FomulaAutors.HARRIS
    ) {
      calculateBasalMetabolism =
        coefficients[0].value * planificationState.patientInformation.weight +
        coefficients[1].value * planificationState.patientInformation.height +
        coefficients[2].value * planificationState.patientInformation.age +
        constants[0].value;
    } else {
      // OWEN and TINSLEY
      calculateBasalMetabolism = coefficients[0].value * planificationState.patientInformation.weight + constants[0].value;
    }

    dispatch(PlanificationSlice.modifyBasalEnergyRate(parseInt(calculateBasalMetabolism.toFixed(0))));

    dispatch(
      PlanificationSlice.modifyTotalCalories(
        parseInt((calculateBasalMetabolism * planificationState.patientInformation.physicActivityFactor).toFixed(0)),
      ),
    );
  }, [planificationState, selectedFormulaGroup]);

  return (
    <Card variant="outlined">
      <CardHeader title="Calorías del plan" />
      <CardContent>
        <Stack spacing={2}>
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
                    value={planificationState.patientInformation.weight}
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
                    value={planificationState.patientInformation.height}
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
                    value={planificationState.patientInformation.age}
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
                      value={planificationState.patientInformation.gender}
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

          <Typography variant="body2">
            Gasto Energético Basal (GEB): <b>{planificationState.configuredMacros.basalEnergyRate} kcal</b>
          </Typography>

          <PhysicActivityFactor selectedFormulaGroup={selectedFormulaGroup} />
        </Stack>
      </CardContent>
    </Card>
  );
}
