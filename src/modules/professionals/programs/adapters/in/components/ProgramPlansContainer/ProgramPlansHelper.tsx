import React from 'react';
import { EventContentArg } from '@fullcalendar/core';
import PlansDetailDialog from 'src/modules/professionals/programs/adapters/in/dialogs/PlansDetailDialog/PlansDetailDialog';
import PlanBasicInformation from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/PlanBasicInformation';
import { Plan } from 'src/modules/professionals/programs/adapters/out/program.types';

function ProgramPlansHelper(arg: EventContentArg) {
  if (arg.event.extendedProps.plan === null) {
    return <PlansDetailDialog dayPlan={arg.event.extendedProps.dayPlan as number} />;
  } else {
    return <PlanBasicInformation plan={arg.event.extendedProps.plan as Plan} />;
  }
}

export default ProgramPlansHelper;
