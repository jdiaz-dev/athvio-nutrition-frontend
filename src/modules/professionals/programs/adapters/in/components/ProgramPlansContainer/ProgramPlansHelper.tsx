import React from 'react';
import { EventContentArg } from '@fullcalendar/core';
import PlanBasicInformation from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/PlanBasicInformation';
import CreatePlanMealButton from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/CreatePlanButton';
import { DateItemExtendedProps } from 'src/modules/professionals/programs/adapters/out/program.types';

// it is a function not  a component, therefore doesn't support hooks
function ProgramPlansHelper(arg: EventContentArg) {
  const { program, plan, planDay, planWeek } = arg.event.extendedProps as DateItemExtendedProps;
  if (plan._id === null) {
    return <CreatePlanMealButton planDay={planDay} planWeek={planWeek} program={program} />;
  } else {
    return <PlanBasicInformation program={program} plan={plan} />;
  }
}

export default ProgramPlansHelper;
