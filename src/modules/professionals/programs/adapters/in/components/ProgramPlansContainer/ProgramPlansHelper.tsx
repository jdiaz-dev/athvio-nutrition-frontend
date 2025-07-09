/* eslint-disable max-len */
import { EventContentArg } from '@fullcalendar/core';
import ProgramPlan from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/ProgramPlanItem';
import CreateProgramPlanItemButton from 'src/modules/professionals/programs/adapters/in/components/ProgramPlansContainer/CreateProgramPlanItemButton CreateProgramPlanItemButton';
import { ProgramPlanDateExtendedProps } from 'src/modules/professionals/programs/adapters/out/program.types';
import PlanWrapper from 'src/shared/components/wrappers/PlanWrapper';
import WrapperItemButtons from 'src/shared/components/wrappers/WrapperItemButtons';

// it is a function not  a component, therefore doesn't support hooks
const ProgramPlansHelper = (arg: EventContentArg) => {
  const { program, planDayInfo, planDay, planWeek } = arg.event.extendedProps as ProgramPlanDateExtendedProps;

  if (planDayInfo.uuid === null) {
    // arg.event.startEditable = false;
    return (
      <PlanWrapper>
        <WrapperItemButtons>
          <CreateProgramPlanItemButton planDay={planDay} planWeek={planWeek} program={program} />
        </WrapperItemButtons>
      </PlanWrapper>
    );
  } else {
    return (
      <PlanWrapper>
        <ProgramPlan program={program} planDay={planDay} planDayInfo={planDayInfo} />
      </PlanWrapper>
    );
  }
};

export default ProgramPlansHelper;
