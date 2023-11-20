import React, { useContext, useState } from 'react';
import { ClientBody } from 'src/modules/clients/clients/adapters/out/client.types';
import { Navigate } from 'react-router-dom';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { Modules } from 'src/shared/Consts';
import ClientBasicInfo from 'src/shared/components/ClientList/ClientBasicInfo';
import { StyledTableCell, StyledTableRow } from 'src/shared/components/CustomizedTable';
import ManageClientGroup from 'src/modules/clients/clients/adapters/in/components/ManageClientGroup';
import ClientOptions from 'src/modules/clients/clients/adapters/in/components/ClientOptions';

function ClientDetail({ client }: { client: ClientBody }) {
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
          {client.state}
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <ManageClientGroup client={client._id} assignedGroups={client.groups} />
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          <ClientOptions client={client._id} />
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}

export default ClientDetail;
