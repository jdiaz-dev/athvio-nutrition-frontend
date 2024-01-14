/* eslint-disable max-len */
import React from 'react';
import { EventContentArg } from '@fullcalendar/core';
import CreateClientPlanButton from 'src/modules/clients/client-plans/adapters/in/components/ClientPlansContainer/CreateClientPlanButton';
import ClientPlanBasicInformation from 'src/modules/clients/client-plans/adapters/in/components/ClientPlansContainer/ClientPlanBasicInformation';
import { ClientPlanDateExtendedProps } from 'src/modules/clients/clients/adapters/out/client.types';
import PlanWrapper from 'src/shared/components/wrappers/PlanWrapper';

// it is a function not  a component, therefore doesn't support hooks
function ClientPlansHelper(arg: EventContentArg) {
  const { client, clientPlanDayInfo, assignedDate } = arg.event.extendedProps as ClientPlanDateExtendedProps;
  if (clientPlanDayInfo._id === null) {
    return (
      <PlanWrapper>
        <CreateClientPlanButton client={client} assignedDate={assignedDate} />
      </PlanWrapper>
    );
  } else {
    return (
      <PlanWrapper>
        <ClientPlanBasicInformation client={client} plan={clientPlanDayInfo} />;
      </PlanWrapper>
    );
  }
}

export default ClientPlansHelper;
