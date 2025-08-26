import * as React from 'react';
import { Box, Container, Grid } from '@mui/material';
import PlanCaloriesForm, {
  PatientPlanData,
} from 'src/modules/patients/patient-console/planifications/adapters/in/dialogs/PlanCaloriesForm';
import MacroForm, { MacroPercents } from 'src/modules/patients/patient-console/planifications/adapters/in/dialogs/MacroForm';
import PlanificationList from 'src/modules/patients/patient-console/planifications/adapters/in/components/PlanificationList';

export default function PlanSetupScreen() {
  const [plan, setPlan] = React.useState<PatientPlanData>({
    weightKg: undefined,
    heightM: undefined,
    age: undefined,
    sex: 'unspecified',
    activityFactor: 1.55,
    planCalories: 3000,
  });

  const [macros, setMacros] = React.useState<MacroPercents>({
    carbs: 25,
    protein: 50,
    fat: 25,
  });

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <PlanCaloriesForm initial={plan} onChange={(v) => setPlan(v)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <MacroForm
            initial={macros}
            onChange={(v) => setMacros(v)}
            showSubmitButton
            onSubmit={(v) => {
              // aquí puedes continuar al siguiente paso / guardar
              console.log('Guardar', { plan, macros: v });
            }}
          />
        </Grid>
      </Grid>
      <Box height={24} />
      <PlanificationList />
    </Container>
  );
}
