import React, { useContext, useState } from 'react';
import { ClientBody } from 'src/modules/clients/clients/adapters/out/client.types';
import { Navigate } from 'react-router-dom';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { Modules } from 'src/shared/Consts';
import ClientBasicInfo from 'src/shared/components/ClientList/ClientBasicInfo';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import SelectClientButton from 'src/modules/professionals/assign-program/in/dialogs/AssignProgramDialog/SelectClientButton';

function ClientItem({ client }: { client: ClientBody }) {
  const currentModuleContext = useContext(CurrentModuleContext);
  const [goToClientPlans, setGoToClientPlans] = useState(false);

  if (currentModuleContext.currentModule === Modules.CLIENTS && goToClientPlans) {
    const path = `/sidenav/Clients/${client._id}/plans`;
    return <Navigate replace to={path} />;
  }

  return (
    <>
      <StyledTableRow key={client._id}>
        <StyledTableCell component="th" scope="row" onClick={() => setGoToClientPlans(true)}>
          <ClientBasicInfo firstName={client.user.firstName} lastName={client.user.lastName} />
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <SelectClientButton client={{ _id: client._id, firstName: client.user.firstName, lastName: client.user.lastName }} />
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}

export default ClientItem;
