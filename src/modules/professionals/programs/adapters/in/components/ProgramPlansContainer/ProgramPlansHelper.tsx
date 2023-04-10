import React from 'react';
import { EventContentArg } from '@fullcalendar/core';
import PlanBasicInformation from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/PlanBasicInformation';
import { Plan } from 'src/modules/professionals/programs/adapters/out/program.types';
import CreatePlanMealButton from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/CreatePlanMealButton';

function ProgramPlansHelper(arg: EventContentArg) {
  const { program, plan, dayPlan } = arg.event.extendedProps;
  if (plan === null) {
    return <CreatePlanMealButton dayPlan={dayPlan as number} />;
  } else {
    return <PlanBasicInformation program={program as string} plan={plan as Plan} />;
  }
}

export default ProgramPlansHelper;
