/* eslint-disable max-len */
import React from 'react';
import { EventContentArg } from '@fullcalendar/core';
import CreateClientPlanButton from 'src/modules/clients/client-plans/adapters/in/components/ClientPlansContainer/CreateClientPlanButton';
import ClientPlanBasicInformation from 'src/modules/clients/client-plans/adapters/in/components/ClientPlansContainer/ClientPlanBasicInformation';
import { ClientPlanDateExtendedProps } from 'src/modules/clients/clients/adapters/out/client.types';

// it is a function not  a component, therefore doesn't support hooks
function ClientPlansHelper(arg: EventContentArg) {
  const { client, clientPlanDayInfo, assignedDate } = arg.event.extendedProps as ClientPlanDateExtendedProps;
  if (clientPlanDayInfo._id === null) {
    return <CreateClientPlanButton client={client} assignedDate={assignedDate} />;
  } else {
    return <ClientPlanBasicInformation client={client} plan={clientPlanDayInfo} />;
  }
}

export default ClientPlansHelper;
