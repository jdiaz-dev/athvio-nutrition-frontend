import React, { useState } from 'react';
import { TableCell, TableRow } from '@mui/material';
import ManageClientGroup from 'src/modules/clients/clients/adapters/in/components/ClientList/ManageClientGroup';
import { ClientBody } from 'src/modules/clients/clients/adapters/out/client.types';
import { Navigate } from 'react-router-dom';
import ClientBasicInfo from 'src/shared/components/ClientBasicInfo';

function ClientDetail({ client }: { client: ClientBody }) {
  const [goToClientPlans, setGoToClientPlans] = useState(false);

  if (goToClientPlans) {
    const path = `/sidenav/Clients/${client._id}/plans`;
    return <Navigate replace to={path} />;
  }
  return (
    <>
      <TableRow key={client._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row" onClick={() => setGoToClientPlans(true)}>
          <ClientBasicInfo firstName={client.user.firstName} lastName={client.user.lastName} />
        </TableCell>
        <TableCell component="th" scope="row">
          <ManageClientGroup client={client._id} assignedGroups={client.groups} />
        </TableCell>
      </TableRow>
    </>
  );
}

export default ClientDetail;
