/* eslint-disable max-len */
import React from 'react';
import { EventContentArg } from '@fullcalendar/core';
import CreateClientPlanButton from 'src/modules/clients/client-plans/adapters/in/components/ClientPlansContainer/CreateClientPlanButton';
import ClientPlanBasicInformation from 'src/modules/clients/client-plans/adapters/in/components/ClientPlansContainer/ClientPlanBasicInformation';
import { ClientPlanDateExtendedProps } from 'src/modules/clients/clients/adapters/out/client.types';

// it is a function not  a component, therefore doesn't support hooks
function ClientPlansHelper(arg: EventContentArg) {
  const { clientPlan, meals } = arg.event.extendedProps as ClientPlanDateExtendedProps;
  if (clientPlan === null) {
    return <CreateClientPlanButton planDay={planDay} planWeek={planWeek} program={program} />;
  } else {
    return <ClientPlanBasicInformation program={program} plan={plan} />;
  }
}

export default ClientPlansHelper;
