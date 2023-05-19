/* eslint-disable max-len */
import React from 'react';
import { EventContentArg } from '@fullcalendar/core';
import ProgramPlanBasicInformation from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/ProgramPlanBasicInformation';
import CreateProgramPlanButton from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/CreateProgramPlanButton';
import { ProgramPlanDateExtendedProps } from 'src/modules/professionals/programs/adapters/out/program.types';

// it is a function not  a component, therefore doesn't support hooks
function ProgramPlansHelper(arg: EventContentArg) {
  const { program, plan, planDay, planWeek } = arg.event.extendedProps as ProgramPlanDateExtendedProps;
  if (plan._id === null) {
    return <CreateProgramPlanButton planDay={planDay} planWeek={planWeek} program={program} />;
  } else {
    return <ProgramPlanBasicInformation program={program} plan={plan} />;
  }
}

export default ProgramPlansHelper;
