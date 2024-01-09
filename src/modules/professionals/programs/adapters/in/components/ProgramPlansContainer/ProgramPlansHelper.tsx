/* eslint-disable max-len */
import React from 'react';
import { EventContentArg } from '@fullcalendar/core';
import ProgramPlanBasicInformation from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/ProgramPlanBasicInformation';
import ProgramPlanItemButtons from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/ProgramPlanItemButtons';
import { ProgramPlanDateExtendedProps } from 'src/modules/professionals/programs/adapters/out/program.types';

// it is a function not  a component, therefore doesn't support hooks
function ProgramPlansHelper(arg: EventContentArg) {
  const { program, planDayInfo, planDay, planWeek } = arg.event.extendedProps as ProgramPlanDateExtendedProps;

  const containerStyles = { height: '120px', width: '100%', margin: 'auto', backgroundColor: 'white', marginTop: '-2px' };
  if (planDayInfo._id === null) {
    // arg.event.startEditable = false;
    return (
      <div style={containerStyles}>
        <ProgramPlanItemButtons planDay={planDay} planWeek={planWeek} program={program} />
      </div>
    );
  } else {
    return (
      <div style={{ ...containerStyles, border: '2px solid red' }}>
        <ProgramPlanBasicInformation program={program} planDayInfo={planDayInfo} />
      </div>
    );
  }
}

export default ProgramPlansHelper;
