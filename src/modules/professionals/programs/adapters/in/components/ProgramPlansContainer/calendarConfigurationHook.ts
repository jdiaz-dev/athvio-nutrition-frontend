import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ProgramPlanDateExtendedProps } from 'src/modules/professionals/programs/adapters/out/program.types';
import { WeekActions, baseHeight, baseWeek } from 'src/shared/Consts';
import { DateItem, ReduxStates } from 'src/shared/types/types';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { DatesSetArg } from '@fullcalendar/core';
dayjs.extend(utc);

export const calendarConfigurationHook = (reloadRecordList: boolean) => {
  const { data: programState } = useSelector((state: ReduxStates) => state.programs.program);
  const [totalWeeks, setTotalWeeks] = useState<number>(baseWeek);
  const [dateSet, setDateSet] = useState<{ dateStart: Date; dateEnd: Date } | null>(null);
  const [contentHeight, setContentHeight] = useState<number>(baseHeight);

  const [weekAction, setWeekAction] = useState<WeekActions>(WeekActions.READY);
  const [datesToShow, setDatesToShow] = useState<DateItem<ProgramPlanDateExtendedProps>[]>([]);
  const [maxWeekWithPlans, setMaxWeekWithPlans] = useState<number>(1);

  useEffect(() => {
    const weeksBasedOnPlans = programState.plans.length > 0 ? programState.plans[programState.plans.length - 1].week : baseWeek;

    const fullWeekTableWithDates = (): DateItem<ProgramPlanDateExtendedProps>[] => {
      let dateStart = dayjs(dateSet ? dateSet.dateStart : new Date());
      let dateItem: DateItem<ProgramPlanDateExtendedProps>;

      let planDay = 1;
      let planWeek = 1;
      let planIndex: number;

      const dates: DateItem<ProgramPlanDateExtendedProps>[] = [];
      while (dateStart < dayjs(dateSet ? dateSet.dateEnd : new Date())) {
        planIndex = programState.plans.findIndex((plan) => plan.day === planDay);
        dateItem = {
          title: '',
          date: dateStart.toDate(),
          extendedProps: {
            program: programState !== undefined ? programState._id : '',
            planDayInfo: {
              _id: programState.plans.length > 0 && planIndex >= 0 ? programState.plans[planIndex]._id : null,
              meals: programState.plans.length > 0 && planIndex >= 0 ? programState.plans[planIndex].meals : null,
            },
            planDay,
            planWeek,
          },
        };
        dateStart = dayjs(dateStart).set('date', dateStart.get('date') + 1);
        planWeek = planDay % 7 === 0 ? planWeek + 1 : planWeek;
        planDay++;
        dates.push(dateItem);
      }
      return dates;
    };
    const handleWeekAction = (): number => {
      if (weekAction === WeekActions.READY) {
        return weeksBasedOnPlans;
      } else if (weekAction === WeekActions.ADD) {
        return totalWeeks + 1;
      } else if (weekAction === WeekActions.REMOVE) {
        return totalWeeks - 1;
      } else {
        return totalWeeks;
      }
    };

    if (dateSet !== null || reloadRecordList) {
      setDatesToShow(fullWeekTableWithDates());
      setMaxWeekWithPlans(weeksBasedOnPlans);
      setTotalWeeks(handleWeekAction());
    }
    if (weekAction !== WeekActions.READY) {
      setWeekAction(WeekActions.NEUTRAL);
    }
  }, [reloadRecordList, dateSet, programState, weekAction]);

  useEffect(() => {
    setContentHeight(baseHeight * totalWeeks);
  }, [totalWeeks]);

  const dateSetHelper = (dateInfo: DatesSetArg) => {
    setDateSet({ dateStart: dateInfo.start, dateEnd: dateInfo.end });
  };

  return { dateSetHelper, setWeekAction, datesToShow, totalWeeks, maxWeekWithPlans, contentHeight };
};
