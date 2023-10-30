import React, { ReactElement, useContext, useState } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { ClientBody } from 'src/modules/clients/clients/adapters/out/client.types';
import { Navigate } from 'react-router-dom';
import { CurrentModuleContext } from 'src/shared/context/CurrentModuleContext';
import { Modules } from 'src/shared/Consts';
import ClientBasicInfo from 'src/shared/components/ClientList/ClientBasicInfo';

function ClientDetail({ client, Details }: { client: ClientBody; Details: (() => ReactElement)[] }) {
  const currentModuleContext = useContext(CurrentModuleContext);
  const [goToClientPlans, setGoToClientPlans] = useState(false);

  const fullDetailComponents = () => {
    const detailComponents: JSX.Element[] = [];

    if (currentModuleContext.currentModule === Modules.CLIENTS) {
      const ManageClientGroupHandler = Details[0];
      const ManageClientGroupComp = <ManageClientGroupHandler client={client._id} assignedGroups={client.groups} />;
      detailComponents.push(ManageClientGroupComp);
    } else if (currentModuleContext.currentModule === Modules.PROGRAMS) {
      const AssignProgramButtonHandler = Details[0];
      const AssignProgramButtonComp = <AssignProgramButtonHandler client={client._id} assignedGroups={client.groups} />;
      detailComponents.push(AssignProgramButtonComp);
    }
    return detailComponents;
  };

  if (currentModuleContext.currentModule === Modules.CLIENTS && goToClientPlans) {
    const path = `/sidenav/Clients/${client._id}/plans`;
    return <Navigate replace to={path} />;
  }

  return (
    <>
      <TableRow key={client._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row" onClick={() => setGoToClientPlans(true)}>
          <ClientBasicInfo firstName={client.user.firstName} lastName={client.user.lastName} />
        </TableCell>
        {fullDetailComponents().map((Comp, index) => (
          <TableCell key={index} component="th" scope="row">
            {Comp}
          </TableCell>
        ))}
      </TableRow>
    </>
  );
}

export default ClientDetail;
