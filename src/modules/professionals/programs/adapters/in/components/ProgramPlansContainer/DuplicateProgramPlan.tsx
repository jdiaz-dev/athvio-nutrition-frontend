import React, { useContext } from 'react';
import { usePlan } from 'src/modules/professionals/programs/adapters/out/PlanActions';
import { ReduxStates } from 'src/shared/types/types';
import { useSelector } from 'react-redux';
import CustomPasteIcon from 'src/shared/components/Icons/CustomPasteIcon';
import { AuthContext } from 'src/modules/auth/auth/adapters/in/context/AuthContext';

function DuplicateProgramPlan({ newWeek, newDay }: { newWeek: number; newDay: number }) {
  const authContext = useContext(AuthContext);
  const { data: programState } = useSelector((state: ReduxStates) => state.programs.program);
  const planState = useSelector((state: ReduxStates) => state.programs.plan);

  const { duplicateProgramPlan } = usePlan();
  const duplicateProgramPlanHandler = async () => {
    await duplicateProgramPlan({
      professional: authContext.professional,
      program: programState.uuid,
      plan: planState.uuid,
      week: newWeek, // t0do: fix it
      day: newDay,
    });
  };

  return <CustomPasteIcon handler={duplicateProgramPlanHandler} />;
}

export default DuplicateProgramPlan;
