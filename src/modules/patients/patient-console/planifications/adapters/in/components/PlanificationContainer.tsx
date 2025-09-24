import React, { useState } from 'react';
import { Container } from '@mui/material';
import PlanificationList from 'src/modules/patients/patient-console/planifications/adapters/in/components/PlanificationList';
import TitleAndButtonModule from 'src/shared/components/TitleAndButtonModule';
import CreateUpdatePlanificationDialog from 'src/modules/patients/patient-console/planifications/adapters/in/dialogs/CreateUpdatePlanificationDialog';

export default function PlanSetupScreen() {
  const [openCreateUpdatePlanificationDialog, setOpenCreateUpdatePlanificationDialog] = useState(false);

  const buttonOnclikHandler = () => {
    setOpenCreateUpdatePlanificationDialog(true);
  };
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <TitleAndButtonModule titleModule={'Planificaciones'} buttonName={'Nueva Planificación'} buttonHandler={buttonOnclikHandler} />
      <PlanificationList />
      {openCreateUpdatePlanificationDialog && (
        <CreateUpdatePlanificationDialog
          openCreateUpdatePlanificationDialog={openCreateUpdatePlanificationDialog}
          setOpenCreateUpdatePlanificationDialog={setOpenCreateUpdatePlanificationDialog}
          dialogTitle={'Crear planificación'}
        />
      )}
    </Container>
  );
}
