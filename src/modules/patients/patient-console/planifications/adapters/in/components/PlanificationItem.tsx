import React, { useContext, useState } from 'react';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { PlanificationBody } from 'src/modules/patients/patient-console/planifications/helpers/planifications';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import CreateUpdatePlanificationDialog from 'src/modules/patients/patient-console/planifications/adapters/in/dialogs/CreateUpdatePlanificationDialog';

function PlanificationItem({ planification }: { planification: PlanificationBody }) {
  const authContext = useContext(AuthContext);
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
          {planification.configuredMacros.calories}
        </StyledTableCell>
      </StyledTableRow>

      {openCreateUpdatePlanificationDialog && (
        <CreateUpdatePlanificationDialog
          openCreateUpdatePlanificationDialog={openCreateUpdatePlanificationDialog}
          setOpenCreateUpdatePlanificationDialog={setOpenCreateUpdatePlanificationDialog}
          planification={planification}
          dialogTitle={'Actualizar planificación'}
        />
      )}
    </>
  );
}

export default PlanificationItem;
