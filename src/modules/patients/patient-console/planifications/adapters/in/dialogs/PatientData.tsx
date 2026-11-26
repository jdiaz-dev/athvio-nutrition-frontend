import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import * as PlanificationSlice from 'src/modules/patients/patient-console/planifications/adapters/in/slicers/PlanificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';
import { PlanificationBody } from '../../../helpers/planifications';

export default function PatientData() {
  const dispatch = useDispatch();
  const planificationState = useSelector((state: ReduxStates) => state.planifications.planification) as PlanificationBody;

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardHeader title="Datos del paciente" />
      <CardContent>
        <Box sx={{ mt: -5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
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
            <Grid item xs={12} sm={3}>
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
            <Grid item xs={12} sm={3}>
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
            <Grid item xs={12} sm={3}>
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
      </CardContent>
    </Card>
  );
}
