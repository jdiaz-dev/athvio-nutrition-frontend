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
import { Case, FormulaGroup } from 'src/modules/nutrition/formulas/types/formula';
import PhysicActivityFactor from './PhysicActivityFactor';
import { PlanificationBody } from '../../../helpers/planifications';

enum FomulaAutors {
  MIFFLIN = 'MIFFLIN',
  HARRIS = 'HARRIS',
  OWEN = 'OWEN',
  TINSLEY = 'TINSLEY',
}

export default function PlanCaloriesForm({ selectedFormulaGroup }: { selectedFormulaGroup: FormulaGroup | null }) {
  const dispatch = useDispatch();
  const planificationState = useSelector((state: ReduxStates) => state.planifications.planification) as PlanificationBody;
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
