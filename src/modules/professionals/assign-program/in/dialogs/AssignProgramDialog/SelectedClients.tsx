import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxStates } from 'src/shared/types/types';

function SelectedClients() {
  const assignProgramState = useSelector((state: ReduxStates) => state.assignProgram);

  return (
    <div>
      selected clients
      {assignProgramState.clients.map((client) => (
        <div>
          {client.firstName} {client.lastName}
        </div>
      ))}
    </div>
  );
}

export default SelectedClients;
