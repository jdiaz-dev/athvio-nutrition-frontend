import React, { useState } from 'react';
import { PlanificationBody } from 'src/modules/patients/patient-console/planifications/helpers/planifications';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import CreateUpdatePlanificationDialog from 'src/modules/patients/patient-console/planifications/adapters/in/dialogs/CreateUpdatePlanificationDialog';
import { Button } from '@mui/material';

function PlanificationItem({ planification }: { planification: PlanificationBody }) {
  const [openCreateUpdatePlanificationDialog, setOpenCreateUpdatePlanificationDialog] = useState(false);

  return (
    <>
      <StyledTableRow key={planification.uuid}>
        <StyledTableCell component="th" scope="row">
          {planification.uuid}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {planification.createdAt}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" style={{ cursor: 'pointer' }}>
          {planification.configuredMacros.planCalories}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" style={{ cursor: 'pointer' }}>
          <Button
            variant="contained"
            style={{ marginRight: '20px' }}
            onClick={() => {
              setOpenCreateUpdatePlanificationDialog(true);
            }}
          >
            Editar
          </Button>
        </StyledTableCell>
      </StyledTableRow>

      {openCreateUpdatePlanificationDialog && (
        <CreateUpdatePlanificationDialog
          openCreateUpdatePlanificationDialog={openCreateUpdatePlanificationDialog}
          setOpenCreateUpdatePlanificationDialog={setOpenCreateUpdatePlanificationDialog}
          dialogTitle={'Actualizar planificación'}
          planification={planification}
        />
      )}
    </>
  );
}

export default PlanificationItem;
