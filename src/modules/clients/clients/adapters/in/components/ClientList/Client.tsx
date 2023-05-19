import React, { useState } from 'react';
import { TableCell, TableRow } from '@mui/material';
import ManageClientGroup from 'src/modules/clients/clients/adapters/in/components/ClientList/ManageClientGroup';
import { ClientBody } from 'src/modules/clients/clients/adapters/out/client.types';
import { Navigate } from 'react-router-dom';

function Client({ client }: { client: ClientBody }) {
  const [goToClientPlans, setGoToClientPlans] = useState(false);

  if (goToClientPlans) {
    const path = `/sidenav/Clients/${client._id}/plans`;
    return <Navigate replace to={path} />;
  }
  return (
    <>
      <TableRow key={client._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row" onClick={() => setGoToClientPlans(true)}>
          {client.user.firstName} {client.user.lastName}
        </TableCell>
        <TableCell component="th" scope="row">
          <ManageClientGroup client={client._id} assignedGroups={client.groups} />
        </TableCell>
      </TableRow>
    </>
  );
}

export default Client;
