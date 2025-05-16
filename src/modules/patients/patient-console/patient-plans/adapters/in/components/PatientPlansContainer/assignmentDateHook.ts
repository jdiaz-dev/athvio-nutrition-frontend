import { EventDropArg, EventInput } from '@fullcalendar/core';
import { EventDragStartArg } from '@fullcalendar/interaction';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePatientPlan } from 'src/modules/patients/patient-console/patient-plans/adapters/out/PatientPlanActions';
import { PatientPlanDateExtendedProps } from 'src/modules/patients/patients/adapters/out/patient.types';
import * as PatientPlanSlice from 'src/modules/patients/patient-console/patient-plans/adapters/in/slicers/PatientPlanSlice';
import { ReduxStates } from 'src/shared/types/types';
import { Meal } from 'src/shared/components/PlanDetailDialog/Meal.types';
import { AuthContext } from 'src/modules/authentication/authentication/adapters/in/context/AuthContext';
import dayjs from 'dayjs';

export const assignmentDateHook = (patientId: string) => {
  const authContext = useContext(AuthContext);
  authContext;
  const patientPlanState = useSelector((state: ReduxStates) => state.patientPlans.patientPlan);
  const { updatePatientPlan } = usePatientPlan();
  const dispatch = useDispatch();

  const handleOnStart = (info: EventDragStartArg) => {
    const { patientPlanDayInfo, assignedDate } = info.event.extendedProps as PatientPlanDateExtendedProps;
    const { _id, meals } = patientPlanDayInfo;
    dispatch(
      PatientPlanSlice.acceptNewPatientPlan({
        _id: _id as string,
        patient: patientId,
        meals: meals as Meal[],
        assignedDate,
      }),
    );
  };
  const handleOnDrop = async (info: EventDropArg) => {
    const daysMoved = info.delta.days;
    const previousMonthDay = new Date(patientPlanState.assignedDate).getDate();
    const newMonthDay = new Date(patientPlanState.assignedDate);
    newMonthDay.setDate(previousMonthDay + daysMoved);

    await updatePatientPlan({
      professional: authContext.professional,
      patient: patientId,
      patientPlan: patientPlanState._id,
      assignedDate: dayjs(newMonthDay).toString(),
    });
  };
  const manageDragEffect = (e: EventInput) => {
    if ((e.extendedProps as PatientPlanDateExtendedProps).patientPlanDayInfo._id) {
      e.editable = true;
    } else {
      e.editable = false;
    }
    return e;
  };

  return { handleOnStart, handleOnDrop, manageDragEffect };
};
