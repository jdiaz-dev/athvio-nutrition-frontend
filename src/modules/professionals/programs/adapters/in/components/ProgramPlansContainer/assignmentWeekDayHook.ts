import { EventDropArg, EventInput } from '@fullcalendar/core';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import { usePlan } from 'src/modules/professionals/programs/adapters/out/PlanActions';
import { ProgramPlanDateExtendedProps } from 'src/modules/professionals/programs/adapters/out/program.types';
import { ReduxStates } from 'src/shared/types/types';

export const assignmentWeekDayHook = (programId: string) => {
  const authContext = useContext(AuthContext);
  authContext;
  const programState = useSelector((state: ReduxStates) => state.programs.program);
  const { updatePlanAssignedWeekDay } = usePlan();

  const handleOnDrop = async (info: EventDropArg) => {
    const daysMoved = info.delta.days;
    const indexPlan = programState.plans.findIndex(
      (plan) => plan._id === (info.event.extendedProps as ProgramPlanDateExtendedProps).planDayInfo._id,
    );
    const { _id } = programState.plans[indexPlan];

    const day = programState.plans[indexPlan].day + daysMoved;

    await updatePlanAssignedWeekDay({
      professional: authContext.professional,
      program: programId,
      plan: _id,
      day: day,
      week: day % 7 ? Math.floor(day / 7) + 1 : Math.floor(day / 7),
    });
  };
  const manageDragEffect = (e: EventInput) => {
    if ((e.extendedProps as ProgramPlanDateExtendedProps).planDayInfo._id) {
      e.editable = true;
    } else {
      e.editable = false;
    }
    return e;
  };
  return { handleOnDrop, manageDragEffect };
};
