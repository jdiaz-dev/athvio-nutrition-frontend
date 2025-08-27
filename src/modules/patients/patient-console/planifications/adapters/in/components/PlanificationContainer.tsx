import * as React from 'react';
import { Container } from '@mui/material';
import PlanificationList from 'src/modules/patients/patient-console/planifications/adapters/in/components/PlanificationList';

export default function PlanSetupScreen() {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      {/* <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <PlanCaloriesForm initial={plan} onChange={(v) => setPlan(v)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <MacroForm initial={macros} onChange={(v) => setMacros(v)} showSubmitButton onSubmit={(v) => {}} />
        </Grid>
      </Grid>
      <Box height={24} /> */}
      <PlanificationList />
    </Container>
  );
}
