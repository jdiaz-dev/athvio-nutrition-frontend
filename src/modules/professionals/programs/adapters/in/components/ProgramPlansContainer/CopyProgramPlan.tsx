import React from 'react';
import * as PlanSlice from 'src/modules/professionals/programs/adapters/in/slicers/PlanSlice';
import { useDispatch } from 'react-redux';
import CustomCopyIcon from 'src/shared/components/Icons/CustomCopyIcon';

function CopyProgramPlan({ plan }: { plan: string }) {
  const dispatch = useDispatch();

  const copyPlanHandler = () => {
    dispatch(PlanSlice.duplicatingProgramPlan({ _id: plan }));
  };

  return <CustomCopyIcon handler={copyPlanHandler} />;
}

export default CopyProgramPlan;
