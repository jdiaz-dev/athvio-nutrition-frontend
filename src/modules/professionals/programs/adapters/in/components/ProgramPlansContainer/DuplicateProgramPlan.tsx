import React, { useContext } from 'react';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { usePlan } from 'src/modules/professionals/programs/adapters/out/PlanActions';
import { ProfessionalIdContext } from 'src/App';
import { ReduxStates } from 'src/shared/types/types';
import { useSelector } from 'react-redux';

function DuplicateProgramPlan({ newWeek, newDay }: { newWeek: number; newDay: number }) {
  const professionalIdContext = useContext(ProfessionalIdContext);
  const programState = useSelector((state: ReduxStates) => state.programs.program);
  const planState = useSelector((state: ReduxStates) => state.programs.plan);

  const { duplicateProgramPlan } = usePlan();
  const duplicateProgramPlanHandler = async () => {
    await duplicateProgramPlan({
      professional: professionalIdContext.professional,
      program: programState._id,
      plan: planState._id,
      week: newWeek,
      day: newDay,
    });
  };

  return <ContentPasteIcon onClick={duplicateProgramPlanHandler} />;
}

export default DuplicateProgramPlan;
