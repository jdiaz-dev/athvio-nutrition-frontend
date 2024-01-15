import { EventDropArg, EventInput } from '@fullcalendar/core';
import { EventDragStartArg } from '@fullcalendar/interaction';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfessionalIdContext } from 'src/App';
import { useClientPlan } from 'src/modules/clients/client-plans/adapters/out/ClientPlanActions';
import { ClientPlanDateExtendedProps } from 'src/modules/clients/clients/adapters/out/client.types';
import * as ClientPlanSlice from 'src/modules/clients/client-plans/adapters/in/slicers/ClientPlanSlice';
import { ReduxStates } from 'src/shared/types/types';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';

export const assignmentDateHook = (clientId: string, setReloadRecordList: (val: boolean) => void) => {
  const professionalIdContext = useContext(ProfessionalIdContext);
  professionalIdContext;
  const clientPlanState = useSelector((state: ReduxStates) => state.clientPlans.clientPlan);
  const { updateClientPlan } = useClientPlan();
  const dispatch = useDispatch();

  const handleOnStart = (info: EventDragStartArg) => {
    const { clientPlanDayInfo, assignedDate } = info.event.extendedProps as ClientPlanDateExtendedProps;
    const { _id, meals } = clientPlanDayInfo;
    dispatch(
      ClientPlanSlice.acceptNewClientPlan({
        _id: _id as string,
        client: clientId,
        meals: meals as Meal[],
        assignedDate,
      }),
    );
  };
  const handleOnDrop = async (info: EventDropArg) => {
    const daysMoved = info.delta.days;
    const previousMonthDay = new Date(clientPlanState.assignedDate).getDate();
    const newMonthDay = new Date(clientPlanState.assignedDate);
    newMonthDay.setDate(previousMonthDay + daysMoved);

    await updateClientPlan({
      professional: professionalIdContext.professional,
      client: clientId,
      clientPlan: clientPlanState._id,
      assignedDate: newMonthDay,
    });
    setReloadRecordList(true);
  };
  const manageDragEffect = (e: EventInput) => {
    if ((e.extendedProps as ClientPlanDateExtendedProps).clientPlanDayInfo._id) {
      e.editable = true;
    } else {
      e.editable = false;
    }
    return e;
  };

  return { handleOnStart, handleOnDrop, manageDragEffect };
};
