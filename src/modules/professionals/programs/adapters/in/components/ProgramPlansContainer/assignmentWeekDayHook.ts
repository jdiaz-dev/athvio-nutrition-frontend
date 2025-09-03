import { EventDropArg, EventInput } from '@fullcalendar/core';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';
import { usePlan } from 'src/modules/professionals/programs/adapters/out/PlanActions';
import { ProgramPlanDateExtendedProps } from 'src/modules/professionals/programs/adapters/out/program.types';
import { ReduxStates } from 'src/shared/types/types';

export const assignmentWeekDayHook = (programId: string) => {
  const authContext = useContext(AuthContext);
  const { data: programState } = useSelector((state: ReduxStates) => state.programs.program);
  const { updatePlanAssignedWeekDay } = usePlan();

  const getOnDropProgramDay = (info: EventDropArg) => {
    const programDays: any[] = (info.event._context.options as any).events;

    const daysMoved = info.delta.days;
    const dayExtendedProps = info.oldEvent.extendedProps as ProgramPlanDateExtendedProps;
    const indexPlan = programState.plans.findIndex((plan) => plan.uuid === dayExtendedProps.planDayInfo.uuid);

    const dayToDrop = programState.plans[indexPlan].day + daysMoved;
    const programDay = programDays.filter((item) => item.extendedProps.planDay === dayToDrop);
    const { uuid } = programState.plans[indexPlan];

    return {
      dayToDrop,
      isProgramDayAssigned: programDay[0].extendedProps.planDayInfo.uuid ? true : false,
      planId: uuid,
    };
  };
  const handleOnDrop = async (info: EventDropArg) => {
    const { dayToDrop, isProgramDayAssigned, planId } = getOnDropProgramDay(info);

    if (isProgramDayAssigned) {
      info.revert();
    } else {
      await updatePlanAssignedWeekDay({
        professional: authContext.professional,
        program: programId,
        plan: planId,
        day: dayToDrop,//todo : fix this typescript error
        week: dayToDrop % 7 ? Math.floor(dayToDrop / 7) + 1 : Math.floor(dayToDrop / 7),
      });
    }
  };
  const manageDragEffect = (e: EventInput) => {
    if ((e.extendedProps as ProgramPlanDateExtendedProps).planDayInfo.uuid) {
      e.editable = true;
    } else {
      e.editable = false;
    }

    return e;
  };
  return { handleOnDrop, manageDragEffect };
};
