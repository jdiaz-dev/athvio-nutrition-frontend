import React from 'react';
// import * as PlanSlice from 'src/modules/professionals/programs/adapters/in/slicers/PlanSlice';
import { useDispatch } from 'react-redux';
import CustomCopyIcon from 'src/shared/components/Icons/CustomCopyIcon';
import * as ClientPlanSlice from 'src/modules/clients/client-plans/adapters/in/slicers/PlanSlice';

function CopyClientPlan({ plan }: { plan: string }) {
  const dispatch = useDispatch();

  const copyClientPlanHandler = () => {
    dispatch(ClientPlanSlice.duplicatingClientPlan({ _id: plan }));
  };

  return <CustomCopyIcon handler={copyClientPlanHandler} />;
}

export default CopyClientPlan;
