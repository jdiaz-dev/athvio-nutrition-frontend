/* eslint-disable max-len */
import React from 'react';
import { EventContentArg } from '@fullcalendar/core';
import ProgramPlan from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/ProgramPlan';
import ProgramPlanItemButtons from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/ProgramPlanItemButtons';
import { ProgramPlanDateExtendedProps } from 'src/modules/professionals/programs/adapters/out/program.types';
import PlanWrapper from 'src/shared/components/wrappers/PlanWrapper';
import WrapperItemButtons from 'src/shared/components/wrappers/WrapperItemButtons';

// it is a function not  a component, therefore doesn't support hooks
function ProgramPlansHelper(arg: EventContentArg) {
  const { program, planDayInfo, planDay, planWeek } = arg.event.extendedProps as ProgramPlanDateExtendedProps;

  if (planDayInfo._id === null) {
    // arg.event.startEditable = false;
    return (
      <PlanWrapper>
        <WrapperItemButtons>
          <ProgramPlanItemButtons planDay={planDay} planWeek={planWeek} program={program} />
        </WrapperItemButtons>
      </PlanWrapper>
    );
  } else {
    return (
      <PlanWrapper>
        <ProgramPlan program={program} planDayInfo={planDayInfo} />
      </PlanWrapper>
    );
  }
}

export default ProgramPlansHelper;
